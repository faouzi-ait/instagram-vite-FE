import fs from 'node:fs/promises'
import ts from 'typescript'

const generatedFile = 'src/types/generated/api.d.ts'
const exportsFile = 'src/types/api.ts'

const source = await fs.readFile(generatedFile, 'utf8')

const sourceFile = ts.createSourceFile(
  generatedFile,
  source,
  ts.ScriptTarget.Latest,
  true,
)

const components = sourceFile.statements.find(
  (node) => ts.isInterfaceDeclaration(node) && node.name.text === 'components',
)

const schemas = components?.members.find(
  (node) =>
    ts.isPropertySignature(node) &&
    node.name?.getText(sourceFile).replace(/['"]/g, '') === 'schemas',
)

if (!schemas?.type || !ts.isTypeLiteralNode(schemas.type)) {
  throw new Error('Could not find components.schemas in generated API types.')
}

const usedNames = new Set()

const aliases = schemas.type.members
  .filter(ts.isPropertySignature)
  .map((schema) => {
    const schemaName = schema.name.text

    // Convert schema names into safe TypeScript export names.
    let exportName = schemaName.replace(/[^a-zA-Z0-9_$]/g, '_')

    if (!/^[a-zA-Z_$]/.test(exportName)) {
      exportName = `Schema_${exportName}`
    }

    // Prefix reserved words, while preserving normal names.
    if (
      ts.stringToToken(exportName) !== undefined ||
      exportName === 'components'
    ) {
      exportName = `Schema_${exportName}`
    }

    if (usedNames.has(exportName)) {
      throw new Error(`Duplicate generated export name: ${exportName}`)
    }

    usedNames.add(exportName)

    return (
      `export type ${exportName} = ` +
      `components['schemas'][${JSON.stringify(schemaName)}]`
    )
  })

await fs.writeFile(
  exportsFile,
  [
    '// Auto-generated. Do not edit manually.',
    "import type { components } from './generated/api'",
    '',
    ...aliases,
    '',
  ].join('\n'),
)

console.log(`Generated ${aliases.length} API type exports in ${exportsFile}`)
