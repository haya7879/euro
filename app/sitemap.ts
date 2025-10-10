import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://euroqst.com'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/training-courses`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ]

  // Fetch categories from API
  try {
    const apiUrl = 'https://api.euroqst.com/api'
    
    const categoriesRes = await fetch(`${apiUrl}/categories`, {
      next: { revalidate: 86400 } // Revalidate every 24 hours
    })
    const categories = await categoriesRes.json()
    
    const categoryPages: MetadataRoute.Sitemap = categories.data?.map((category: any) => ({
      url: `${baseUrl}/training-courses/${category.slug}`,
      lastModified: new Date(category.updated_at || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })) || []

    // Fetch cities
    const citiesRes = await fetch(`${apiUrl}/cities`, {
      next: { revalidate: 86400 }
    })
    const cities = await citiesRes.json()
    
    const cityPages: MetadataRoute.Sitemap = cities.data?.map((city: any) => ({
      url: `${baseUrl}/training-cities/${city.slug}`,
      lastModified: new Date(city.updated_at || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })) || []

    return [...staticPages, ...categoryPages, ...cityPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticPages
  }
}

