// The app shares the website's engine and translations (../src/lib). Metro does not
// follow tsconfig paths that point outside the project, so "@/..." is mapped here and
// the website's src folder is watched.
const path = require("path")
const { getDefaultConfig } = require("expo/metro-config")

const config = getDefaultConfig(__dirname)
const shared = path.resolve(__dirname, "../src")

config.watchFolders = [...(config.watchFolders ?? []), shared]
const defaultResolve = config.resolver.resolveRequest
config.resolver.resolveRequest = (context, moduleName, platform) => {
  const target = moduleName.startsWith("@/") ? path.join(shared, moduleName.slice(2)) : moduleName
  return (defaultResolve ?? context.resolveRequest)(context, target, platform)
}
// Shared files import nothing from node_modules except through the app, so resolve
// packages from the app's own node_modules only
config.resolver.nodeModulesPaths = [path.resolve(__dirname, "node_modules")]

module.exports = config
