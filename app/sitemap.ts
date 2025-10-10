import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://euroqst.com'
  const currentDate = new Date()
  
  // Static pages with better priority distribution
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/training-courses`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/training-cities`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sitemap`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Fetch dynamic pages from API
  try {
    const apiUrl = 'https://api.euroqst.com/api'
    
    // Helper function to safely parse JSON response
    const parseJsonResponse = async (response: Response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Expected JSON but got ${contentType}`)
      }
      
      return await response.json()
    }
    
    // Fetch categories
    const categoriesRes = await fetch(`${apiUrl}/categories`, {
      next: { revalidate: 86400 } // Revalidate every 24 hours
    })
    const categories = await parseJsonResponse(categoriesRes)
    
    const categoryPages: MetadataRoute.Sitemap = categories.data?.map((category: any) => ({
      url: `${baseUrl}/training-courses/${category.slug}`,
      lastModified: new Date(category.updated_at || currentDate),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })) || []

    // Fetch cities
    const citiesRes = await fetch(`${apiUrl}/cities`, {
      next: { revalidate: 86400 }
    })
    const cities = await parseJsonResponse(citiesRes)
    
    const cityPages: MetadataRoute.Sitemap = cities.data?.map((city: any) => ({
      url: `${baseUrl}/training-cities/${city.slug}`,
      lastModified: new Date(city.updated_at || currentDate),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })) || []

    // Fetch courses (if available)
    try {
      const coursesRes = await fetch(`${apiUrl}/courses?limit=1000`, {
        next: { revalidate: 86400 }
      })
      const courses = await parseJsonResponse(coursesRes)
      
      const coursePages: MetadataRoute.Sitemap = courses.data?.map((course: any) => ({
        url: `${baseUrl}/training-course/${course.slug}`,
        lastModified: new Date(course.updated_at || currentDate),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })) || []

      return [...staticPages, ...categoryPages, ...cityPages, ...coursePages]
    } catch (courseError) {
      console.warn('Error fetching courses for sitemap:', courseError)
      return [...staticPages, ...categoryPages, ...cityPages]
    }
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticPages
  }
}

