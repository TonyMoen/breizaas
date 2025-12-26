import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('Project Initialization', () => {
  describe('Package Configuration', () => {
    it('should have Next.js 15+ installed', () => {
      const packageJson = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8')
      )
      const nextVersion = packageJson.dependencies.next
      const majorVersion = parseInt(nextVersion.replace(/[^\d]/g, '').substring(0, 2))
      expect(majorVersion).toBeGreaterThanOrEqual(15)
    })

    it('should have TypeScript 5+ installed', () => {
      const packageJson = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8')
      )
      const tsVersion = packageJson.devDependencies.typescript
      const majorVersion = parseInt(tsVersion.replace(/[^\d]/g, '').charAt(0))
      expect(majorVersion).toBeGreaterThanOrEqual(5)
    })

    it('should have Tailwind CSS v4 installed', () => {
      const packageJson = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8')
      )
      const tailwindVersion = packageJson.devDependencies.tailwindcss
      const majorVersion = parseInt(tailwindVersion.replace(/[^\d]/g, '').charAt(0))
      expect(majorVersion).toBeGreaterThanOrEqual(4)
    })

    it('should have React 19+ installed', () => {
      const packageJson = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8')
      )
      const reactVersion = packageJson.dependencies.react
      const majorVersion = parseInt(reactVersion.replace(/[^\d]/g, '').substring(0, 2))
      expect(majorVersion).toBeGreaterThanOrEqual(19)
    })
  })

  describe('TypeScript Configuration', () => {
    it('should have strict mode enabled', () => {
      const tsConfig = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), 'tsconfig.json'), 'utf-8')
      )
      expect(tsConfig.compilerOptions.strict).toBe(true)
    })

    it('should have import alias configured', () => {
      const tsConfig = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), 'tsconfig.json'), 'utf-8')
      )
      expect(tsConfig.compilerOptions.paths).toHaveProperty('@/*')
      expect(tsConfig.compilerOptions.paths['@/*']).toContain('./src/*')
    })
  })

  describe('Project Structure', () => {
    it('should have src directory', () => {
      expect(fs.existsSync(path.join(process.cwd(), 'src'))).toBe(true)
    })

    it('should have app directory inside src', () => {
      expect(fs.existsSync(path.join(process.cwd(), 'src', 'app'))).toBe(true)
    })

    it('should have components directory with ui subdirectory', () => {
      expect(fs.existsSync(path.join(process.cwd(), 'src', 'components', 'ui'))).toBe(true)
    })

    it('should have lib directory with utils.ts', () => {
      expect(fs.existsSync(path.join(process.cwd(), 'src', 'lib', 'utils.ts'))).toBe(true)
    })
  })

  describe('Environment Variables', () => {
    it('should have .env.example file', () => {
      expect(fs.existsSync(path.join(process.cwd(), '.env.example'))).toBe(true)
    })

    it('should have required environment variables documented', () => {
      const envExample = fs.readFileSync(
        path.join(process.cwd(), '.env.example'),
        'utf-8'
      )
      expect(envExample).toContain('BANDSINTOWN_APP_ID')
      expect(envExample).toContain('SHOPIFY_STOREFRONT_ACCESS_TOKEN')
      expect(envExample).toContain('SHOPIFY_STORE_DOMAIN')
      expect(envExample).toContain('SANITY_API_TOKEN')
      expect(envExample).toContain('NEXT_PUBLIC_SANITY_PROJECT_ID')
    })

    it('should have .env.local in .gitignore', () => {
      const gitignore = fs.readFileSync(
        path.join(process.cwd(), '.gitignore'),
        'utf-8'
      )
      expect(gitignore).toContain('.env')
    })
  })

  describe('shadcn/ui Configuration', () => {
    it('should have components.json file', () => {
      expect(fs.existsSync(path.join(process.cwd(), 'components.json'))).toBe(true)
    })

    it('should have required shadcn/ui components', () => {
      const requiredComponents = ['button', 'card', 'form', 'input', 'label']
      requiredComponents.forEach(component => {
        const componentPath = path.join(
          process.cwd(),
          'src',
          'components',
          'ui',
          `${component}.tsx`
        )
        expect(fs.existsSync(componentPath)).toBe(true)
      })
    })

    it('should have shadcn/ui configured for Next.js', () => {
      const componentsConfig = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), 'components.json'), 'utf-8')
      )
      expect(componentsConfig.rsc).toBe(true)
      expect(componentsConfig.tsx).toBe(true)
    })
  })
})
