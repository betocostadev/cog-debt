import { describe, it, expect } from 'vitest'
import { routeTree } from '#/routeTree.gen'

// https://tanstack.com/router/latest/docs/how-to/test-file-based-routing

describe('Generated Route Tree', () => {
  it('should generate route tree from file structure', () => {
    // Test that route tree exists and has expected structure
    expect(routeTree).toBeDefined()
    expect(routeTree.children).toBeDefined()
  })

  it('should include all expected routes', () => {
    const getAllRoutePaths = (tree: any, paths: string[] = []): string[] => {
      const routePath =
        tree.fullPath ||
        tree.path ||
        tree.options?.path ||
        tree.options?.id ||
        tree.id

      if (routePath && routePath !== '__root__') {
        paths.push(routePath)
      }

      const children = tree.children || tree.options?.children

      if (children) {
        const childrenArray = Array.isArray(children)
          ? children
          : Object.values(children)

        childrenArray.forEach((child: any) => {
          getAllRoutePaths(child, paths)
        })
      }

      return paths
    }

    const routePaths = getAllRoutePaths(routeTree)

    expect(routePaths).toContain('/')
    expect(routePaths).toContain('/login')
    expect(routePaths).toContain('/help')
    expect(routePaths).toContain('/profile')
    expect(routePaths).toContain('/about')
    expect(routePaths).toContain('/dashboard')
    // Department pages
    expect(routePaths).toContain('/departments/')
    expect(routePaths).toContain('/departments/$departmentId/')
    // User pages
    expect(routePaths).toContain('/users/')
    expect(routePaths).toContain('/users/new')
    expect(routePaths).toContain('/users/$userId/')
    expect(routePaths).toContain('/users/$userId/edit')
  })

  it('should have correct route hierarchy', () => {
    // @ts-ignore .find() works as it returns an array with Route { ... }
    const homeRoute = routeTree.children?.find(
      (child: any) => child.options.path === '/',
    )
    expect(homeRoute).toBeDefined()

    // Test for specific route structure based on your file organization
    // For example, if you have /posts/$postId routes:
    // const postsRoute = routeTree.children?.find((child: any) => child.path === '/posts')
    // expect(postsRoute?.children).toBeDefined()
    // console.log(routeTree.children)

    // @ts-ignore returns an array with Route { ... }
    const dashboardRoute = routeTree.children?.find(
      (child: any) =>
        child.options?.path === '/dashboard' || child.id === '/dashboard',
    )

    expect(dashboardRoute).toBeDefined()
    expect(dashboardRoute?.children).toBeDefined()

    const dashboardChildPaths = dashboardRoute.children.map(
      (child: any) => child.options?.path || child.options?.id,
    )
    // console.log('Dashboard Children Paths:', dashboardChildPaths)

    expect(dashboardChildPaths).toContain('/users/')
    expect(dashboardChildPaths).toContain('/users/new')
    expect(dashboardChildPaths).toContain('/users/$userId/')
    expect(dashboardChildPaths).toContain('/users/$userId/edit')
    expect(dashboardChildPaths).toContain('/departments/')
    expect(dashboardChildPaths).toContain('/departments/$departmentId/')
  })
})
