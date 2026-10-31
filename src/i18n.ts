// ============================================
// MULTI-LANGUAGE CONFIGURATION & TRANSLATIONS
// ============================================

export const SUPPORTED_LOCALES = ['en', 'zh', 'fr', 'es', 'ru'] as const
export type Locale = typeof SUPPORTED_LOCALES[number]
export const DEFAULT_LOCALE: Locale = 'en'

export function getLocale(value: string): Locale {
  return isValidLocale(value) ? value : DEFAULT_LOCALE
}

export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  fr: 'Français',
  es: 'Español',
  ru: 'Русский'
}

// Translation strings
export const TRANSLATIONS: Record<Locale, any> = {
  en: {
    nav: { home: 'Home', products: 'Products', articles: 'Articles', categories: 'Categories', admin: 'Admin' },
    home: {
      hero: 'Expert Gaming Gear Reviews',
      subtitle: 'In-depth reviews, comparisons, and buying guides for gaming mice, keyboards, headsets, and monitors.',
      browse: 'Browse Products',
      read: 'Read Articles',
      browseCategory: 'Browse by Category',
      featured: 'Featured Products',
      latest: 'Latest Articles',
      viewAll: 'View All'
    },
    products: {
      title: 'All Products',
      notFound: 'No products found.',
      readReview: 'Read Review',
      resultsCount: 'products found'
    },
    filter: {
      category: 'Category',
      brand: 'Brand',
      minPrice: 'Min Price',
      maxPrice: 'Max Price',
      minRating: 'Min Rating',
      sortBy: 'Sort By',
      allCategories: 'All Categories',
      allBrands: 'All Brands',
      anyRating: 'Any Rating',
      sortNewest: 'Newest',
      sortRating: 'Highest Rated',
      sortPriceAsc: 'Price: Low to High',
      sortPriceDesc: 'Price: High to Low',
      sortName: 'Name (A-Z)',
      apply: 'Apply',
      reset: 'Reset'
    },
    articles: {
      title: 'All Articles',
      notFound: 'No articles found.',
      minRead: 'min read'
    },
    categories: {
      title: 'All Categories',
      notFound: 'No categories found.'
    },
    detail: {
      productNotFound: 'Product Not Found',
      articleNotFound: 'Article Not Found',
      categoryNotFound: 'Category Not Found',
      backProducts: '← Back to Products',
      backArticles: '← Back to Articles',
      backCategories: '← All Categories',
      featured: 'Featured',
      specs: 'Specifications',
      rating: 'Rating Breakdown',
      overall: 'Overall',
      buildQuality: 'Build Quality',
      performance: 'Performance',
      value: 'Value',
      pros: 'Pros',
      cons: 'Cons',
      buyAmazon: 'Buy on Amazon',
      buyDirect: 'Buy Direct',
      updated: 'Updated',
      quickVerdict: 'Quick Verdict',
      contentSoon: 'Content coming soon...',
      productsCount: 'Products',
      noProducts: 'No products in this category yet.',
      share: 'Share',
      tags: 'Tags',
      toc: 'Table of Contents',
      featuredProducts: 'Featured Products',
      topPicks: 'Top Picks',
      viewAllArticles: 'View all articles',
      relatedArticles: 'Related Articles',
      loading: 'Loading...',
      aboutAuthor: 'About the Author'
    },
    search: {
      title: 'Search',
      placeholder: 'Search products and articles...',
      search: 'Search',
      all: 'All',
      noResults: 'No results found. Try different keywords.',
      resultsFound: 'results found'
    },
    theme: {
      toggle: 'Toggle theme'
    },
    compare: {
      title: 'Compare Products',
      add: 'Add to Compare',
      remove: 'Remove',
      clear: 'Clear All',
      noProducts: 'No products selected for comparison',
      selectMore: 'Select 2-4 products to compare',
      specs: 'Specifications',
      ratings: 'Ratings',
      price: 'Price',
      rating: 'Rating',
      best: 'Best'
    },
    footer: {
      copyright: '© 2026 GearLabGaming. All rights reserved.'
    },
    priceHistory: {
      title: 'Price History',
      current: 'Current Price',
      lowest: 'Lowest',
      highest: 'Highest',
      average: 'Average',
      lastUpdate: 'Last updated',
      noData: 'No price history available'
    },
    comments: {
      title: 'Comments',
      add: 'Add a Comment',
      submit: 'Submit',
      name: 'Name',
      email: 'Email',
      content: 'Your Comment',
      rating: 'Rating',
      noComments: 'No comments yet',
      login: 'Login to comment',
      pending: 'Your comment is pending approval',
      success: 'Comment added successfully'
    },
    wishlist: {
      title: 'Wishlist',
      add: 'Add to Wishlist',
      remove: 'Remove from Wishlist',
      empty: 'Your wishlist is empty',
      view: 'View Wishlist'
    }
  },
  zh: {
    nav: { home: '首页', products: '产品', articles: '文章', categories: '分类', admin: '管理' },
    home: {
      hero: '专业游戏装备评测',
      subtitle: '游戏鼠标、键盘、耳机和显示器的深度评测、对比和购买指南。',
      browse: '浏览产品',
      read: '阅读文章',
      browseCategory: '按分类浏览',
      featured: '精选产品',
      latest: '最新文章',
      viewAll: '查看全部'
    },
    products: {
      title: '所有产品',
      notFound: '暂无产品。',
      readReview: '查看评测',
      resultsCount: '个产品'
    },
    filter: {
      category: '分类',
      brand: '品牌',
      minPrice: '最低价',
      maxPrice: '最高价',
      minRating: '最低评分',
      sortBy: '排序',
      allCategories: '全部分类',
      allBrands: '全部品牌',
      anyRating: '不限评分',
      sortNewest: '最新发布',
      sortRating: '评分最高',
      sortPriceAsc: '价格从低到高',
      sortPriceDesc: '价格从高到低',
      sortName: '名称排序',
      apply: '应用',
      reset: '重置'
    },
    articles: {
      title: '所有文章',
      notFound: '暂无文章。',
      minRead: '分钟阅读'
    },
    categories: {
      title: '所有分类',
      notFound: '暂无分类。'
    },
    detail: {
      productNotFound: '未找到产品',
      articleNotFound: '未找到文章',
      categoryNotFound: '未找到分类',
      backProducts: '← 返回产品',
      backArticles: '← 返回文章',
      backCategories: '← 所有分类',
      featured: '精选',
      specs: '规格参数',
      rating: '评分详情',
      overall: '综合',
      buildQuality: '做工质量',
      performance: '性能表现',
      value: '性价比',
      pros: '优点',
      cons: '缺点',
      buyAmazon: '亚马逊购买',
      buyDirect: '官网购买',
      updated: '更新于',
      quickVerdict: '快速结论',
      contentSoon: '内容即将推出...',
      productsCount: '个产品',
      noProducts: '该分类暂无产品。',
      share: '分享',
      tags: '标签',
      toc: '目录',
      featuredProducts: '精选产品',
      topPicks: '首选推荐',
      viewAllArticles: '查看所有文章',
      relatedArticles: '相关文章',
      loading: '加载中...',
      aboutAuthor: '关于作者'
    },
    search: {
      title: '搜索',
      placeholder: '搜索产品和文章...',
      search: '搜索',
      all: '全部',
      noResults: '未找到结果，请尝试其他关键词。',
      resultsFound: '个结果'
    },
    theme: {
      toggle: '切换主题'
    },
    compare: {
      title: '产品对比',
      add: '添加对比',
      remove: '移除',
      clear: '清空',
      noProducts: '未选择要对比的产品',
      selectMore: '选择 2-4 个产品进行对比',
      specs: '规格',
      ratings: '评分',
      price: '价格',
      rating: '评分',
      best: '最佳'
    },
    footer: {
      copyright: '© 2026 GearLabGaming. 保留所有权利。'
    },
    priceHistory: {
      title: '价格历史',
      current: '当前价格',
      lowest: '最低',
      highest: '最高',
      average: '平均',
      lastUpdate: '最后更新',
      noData: '暂无价格历史数据'
    },
    comments: {
      title: '评论',
      add: '添加评论',
      submit: '提交',
      name: '姓名',
      email: '邮箱',
      content: '评论内容',
      rating: '评分',
      noComments: '暂无评论',
      login: '登录后评论',
      pending: '您的评论正在等待审核',
      success: '评论添加成功'
    },
    wishlist: {
      title: '愿望清单',
      add: '加入愿望清单',
      remove: '移出愿望清单',
      empty: '您的愿望清单为空',
      view: '查看愿望清单'
    }
  },
  fr: {
    nav: { home: 'Accueil', products: 'Produits', articles: 'Articles', categories: 'Catégories', admin: 'Admin' },
    home: {
      hero: 'Avis d\'experts sur l\'équipement gaming',
      subtitle: 'Avis approfondis, comparaisons et guides d\'achat pour souris, claviers, casques et moniteurs gaming.',
      browse: 'Parcourir les produits',
      read: 'Lire les articles',
      browseCategory: 'Parcourir par catégorie',
      featured: 'Produits vedettes',
      latest: 'Derniers articles',
      viewAll: 'Voir tout'
    },
    products: {
      title: 'Tous les produits',
      notFound: 'Aucun produit trouvé.',
      readReview: 'Lire l\'avis',
      resultsCount: 'produits trouvés'
    },
    filter: {
      category: 'Catégorie',
      brand: 'Marque',
      minPrice: 'Prix Min',
      maxPrice: 'Prix Max',
      minRating: 'Note Min',
      sortBy: 'Trier par',
      allCategories: 'Toutes les catégories',
      allBrands: 'Toutes les marques',
      anyRating: 'Toute note',
      sortNewest: 'Plus récents',
      sortRating: 'Mieux notés',
      sortPriceAsc: 'Prix croissant',
      sortPriceDesc: 'Prix décroissant',
      sortName: 'Nom (A-Z)',
      apply: 'Appliquer',
      reset: 'Réinitialiser'
    },
    articles: {
      title: 'Tous les articles',
      notFound: 'Aucun article trouvé.',
      minRead: 'min de lecture'
    },
    categories: {
      title: 'Toutes les catégories',
      notFound: 'Aucune catégorie trouvée.'
    },
    detail: {
      productNotFound: 'Produit non trouvé',
      articleNotFound: 'Article non trouvé',
      categoryNotFound: 'Catégorie non trouvée',
      backProducts: '← Retour aux produits',
      backArticles: '← Retour aux articles',
      backCategories: '← Toutes les catégories',
      featured: 'Vedette',
      specs: 'Spécifications',
      rating: 'Détail des notes',
      overall: 'Global',
      buildQuality: 'Qualité de fabrication',
      performance: 'Performance',
      value: 'Rapport qualité-prix',
      pros: 'Avantages',
      cons: 'Inconvénients',
      buyAmazon: 'Acheter sur Amazon',
      buyDirect: 'Acheter direct',
      updated: 'Mis à jour',
      quickVerdict: 'Verdict rapide',
      contentSoon: 'Contenu à venir...',
      productsCount: 'Produits',
      noProducts: 'Aucun produit dans cette catégorie.'
    },
    search: {
      title: 'Rechercher',
      placeholder: 'Rechercher des produits et articles...',
      search: 'Rechercher',
      all: 'Tout',
      noResults: 'Aucun résultat. Essayez d\'autres mots-clés.',
      resultsFound: 'résultats trouvés'
    },
    theme: {
      toggle: 'Changer le thème'
    },
    compare: {
      title: 'Comparer les produits',
      add: 'Ajouter à comparer',
      remove: 'Retirer',
      clear: 'Effacer tout',
      noProducts: 'Aucun produit sélectionné',
      selectMore: 'Sélectionnez 2-4 produits à comparer',
      specs: 'Spécifications',
      ratings: 'Notes',
      price: 'Prix',
      rating: 'Note',
      best: 'Meilleur'
    },
    footer: {
      copyright: '© 2026 GearLabGaming. Tous droits réservés.'
    },
    priceHistory: {
      title: 'Historique des prix',
      current: 'Prix actuel',
      lowest: 'Plus bas',
      highest: 'Plus élevé',
      average: 'Moyenne',
      lastUpdate: 'Dernière mise à jour',
      noData: 'Aucun historique de prix disponible'
    },
    comments: {
      title: 'Commentaires',
      add: 'Ajouter un commentaire',
      submit: 'Envoyer',
      name: 'Nom',
      email: 'Email',
      content: 'Votre commentaire',
      rating: 'Note',
      noComments: 'Aucun commentaire pour le moment',
      login: 'Connectez-vous pour commenter',
      pending: 'Votre commentaire est en attente de modération',
      success: 'Commentaire ajouté avec succès'
    },
    wishlist: {
      title: 'Liste de souhaits',
      add: 'Ajouter à la liste',
      remove: 'Retirer de la liste',
      empty: 'Votre liste est vide',
      view: 'Voir la liste'
    }
  },
  es: {
    nav: { home: 'Inicio', products: 'Productos', articles: 'Artículos', categories: 'Categorías', admin: 'Admin' },
    home: {
      hero: 'Reseñas expertas de equipos gaming',
      subtitle: 'Reseñas detalladas, comparaciones y guías de compra para ratones, teclados, auriculares y monitores gaming.',
      browse: 'Ver productos',
      read: 'Leer artículos',
      browseCategory: 'Explorar por categoría',
      featured: 'Productos destacados',
      latest: 'Últimos artículos',
      viewAll: 'Ver todo'
    },
    products: {
      title: 'Todos los productos',
      notFound: 'No se encontraron productos.',
      readReview: 'Leer reseña',
      resultsCount: 'productos encontrados'
    },
    filter: {
      category: 'Categoría',
      brand: 'Marca',
      minPrice: 'Precio Mín',
      maxPrice: 'Precio Máx',
      minRating: 'Puntuación Mín',
      sortBy: 'Ordenar por',
      allCategories: 'Todas las categorías',
      allBrands: 'Todas las marcas',
      anyRating: 'Cualquier puntuación',
      sortNewest: 'Más recientes',
      sortRating: 'Mejor valorados',
      sortPriceAsc: 'Precio ascendente',
      sortPriceDesc: 'Precio descendente',
      sortName: 'Nombre (A-Z)',
      apply: 'Aplicar',
      reset: 'Restablecer'
    },
    articles: {
      title: 'Todos los artículos',
      notFound: 'No se encontraron artículos.',
      minRead: 'min de lectura'
    },
    categories: {
      title: 'Todas las categorías',
      notFound: 'No se encontraron categorías.'
    },
    detail: {
      productNotFound: 'Producto no encontrado',
      articleNotFound: 'Artículo no encontrado',
      categoryNotFound: 'Categoría no encontrada',
      backProducts: '← Volver a productos',
      backArticles: '← Volver a artículos',
      backCategories: '← Todas las categorías',
      featured: 'Destacado',
      specs: 'Especificaciones',
      rating: 'Desglose de puntuación',
      overall: 'General',
      buildQuality: 'Calidad de construcción',
      performance: 'Rendimiento',
      value: 'Relación calidad-precio',
      pros: 'Ventajas',
      cons: 'Desventajas',
      buyAmazon: 'Comprar en Amazon',
      buyDirect: 'Comprar directo',
      updated: 'Actualizado',
      quickVerdict: 'Veredicto rápido',
      contentSoon: 'Contenido próximamente...',
      productsCount: 'Productos',
      noProducts: 'No hay productos en esta categoría.'
    },
    search: {
      title: 'Buscar',
      placeholder: 'Buscar productos y artículos...',
      search: 'Buscar',
      all: 'Todo',
      noResults: 'No se encontraron resultados. Intenta con otras palabras.',
      resultsFound: 'resultados encontrados'
    },
    theme: {
      toggle: 'Cambiar tema'
    },
    compare: {
      title: 'Comparar productos',
      add: 'Añadir a comparar',
      remove: 'Quitar',
      clear: 'Limpiar todo',
      noProducts: 'Ningún producto seleccionado',
      selectMore: 'Selecciona 2-4 productos para comparar',
      specs: 'Especificaciones',
      ratings: 'Puntuaciones',
      price: 'Precio',
      rating: 'Puntuación',
      best: 'Mejor'
    },
    footer: {
      copyright: '© 2026 GearLabGaming. Todos los derechos reservados.'
    },
    priceHistory: {
      title: 'Historial de precios',
      current: 'Precio actual',
      lowest: 'Más bajo',
      highest: 'Más alto',
      average: 'Promedio',
      lastUpdate: 'Última actualización',
      noData: 'No hay historial de precios disponible'
    },
    comments: {
      title: 'Comentarios',
      add: 'Añadir comentario',
      submit: 'Enviar',
      name: 'Nombre',
      email: 'Correo electrónico',
      content: 'Tu comentario',
      rating: 'Puntuación',
      noComments: 'Aún no hay comentarios',
      login: 'Inicia sesión para comentar',
      pending: 'Tu comentario está pendiente de aprobación',
      success: 'Comentario añadido con éxito'
    },
    wishlist: {
      title: 'Lista de deseos',
      add: 'Añadir a la lista',
      remove: 'Eliminar de la lista',
      empty: 'Tu lista está vacía',
      view: 'Ver lista de deseos'
    }
  },
  ru: {
    nav: { home: 'Главная', products: 'Продукты', articles: 'Статьи', categories: 'Категории', admin: 'Админ' },
    home: {
      hero: 'Экспертные обзоры игрового оборудования',
      subtitle: 'Подробные обзоры, сравнения и руководства по покупке игровых мышей, клавиатур, гарнитур и мониторов.',
      browse: 'Смотреть продукты',
      read: 'Читать статьи',
      browseCategory: 'По категориям',
      featured: 'Рекомендуемые продукты',
      latest: 'Последние статьи',
      viewAll: 'Смотреть все'
    },
    products: {
      title: 'Все продукты',
      notFound: 'Продукты не найдены.',
      readReview: 'Читать обзор',
      resultsCount: 'продуктов найдено'
    },
    filter: {
      category: 'Категория',
      brand: 'Бренд',
      minPrice: 'Мин. цена',
      maxPrice: 'Макс. цена',
      minRating: 'Мин. рейтинг',
      sortBy: 'Сортировать',
      allCategories: 'Все категории',
      allBrands: 'Все бренды',
      anyRating: 'Любой рейтинг',
      sortNewest: 'Новейшие',
      sortRating: 'По рейтингу',
      sortPriceAsc: 'Цена: по возрастанию',
      sortPriceDesc: 'Цена: по убыванию',
      sortName: 'По имени (А-Я)',
      apply: 'Применить',
      reset: 'Сбросить'
    },
    articles: {
      title: 'Все статьи',
      notFound: 'Статьи не найдены.',
      minRead: 'мин чтения'
    },
    categories: {
      title: 'Все категории',
      notFound: 'Категории не найдены.'
    },
    detail: {
      productNotFound: 'Продукт не найден',
      articleNotFound: 'Статья не найдена',
      categoryNotFound: 'Категория не найдена',
      backProducts: '← Назад к продуктам',
      backArticles: '← Назад к статьям',
      backCategories: '← Все категории',
      featured: 'Рекомендуем',
      specs: 'Характеристики',
      rating: 'Детальный рейтинг',
      overall: 'Общий',
      buildQuality: 'Качество сборки',
      performance: 'Производительность',
      value: 'Соотношение цена/качество',
      pros: 'Плюсы',
      cons: 'Минусы',
      buyAmazon: 'Купить на Amazon',
      buyDirect: 'Купить напрямую',
      updated: 'Обновлено',
      quickVerdict: 'Быстрый вердикт',
      contentSoon: 'Контент скоро появится...',
      productsCount: 'Продуктов',
      noProducts: 'В этой категории пока нет продуктов.'
    },
    search: {
      title: 'Поиск',
      placeholder: 'Поиск продуктов и статей...',
      search: 'Искать',
      all: 'Всё',
      noResults: 'Ничего не найдено. Попробуйте другие ключевые слова.',
      resultsFound: 'результатов найдено'
    },
    theme: {
      toggle: 'Сменить тему'
    },
    compare: {
      title: 'Сравнить продукты',
      add: 'Добавить к сравнению',
      remove: 'Удалить',
      clear: 'Очистить всё',
      noProducts: 'Продукты не выбраны',
      selectMore: 'Выберите 2-4 продукта для сравнения',
      specs: 'Характеристики',
      ratings: 'Оценки',
      price: 'Цена',
      rating: 'Рейтинг',
      best: 'Лучший'
    },
    footer: {
      copyright: '© 2026 GearLabGaming. Все права защищены.'
    },
    priceHistory: {
      title: 'История цен',
      current: 'Текущая цена',
      lowest: 'Минимум',
      highest: 'Максимум',
      average: 'Среднее',
      lastUpdate: 'Последнее обновление',
      noData: 'История цен недоступна'
    },
    comments: {
      title: 'Комментарии',
      add: 'Добавить комментарий',
      submit: 'Отправить',
      name: 'Имя',
      email: 'Эл. почта',
      content: 'Ваш комментарий',
      rating: 'Оценка',
      noComments: 'Пока нет комментариев',
      login: 'Войдите, чтобы комментировать',
      pending: 'Ваш комментарий ожидает проверки',
      success: 'Комментарий добавлен'
    },
    wishlist: {
      title: 'Список желаний',
      add: 'Добавить в список',
      remove: 'Удалить из списка',
      empty: 'Ваш список пуст',
      view: 'Просмотреть список'
    }
  }
}

export function t(locale: Locale, key: string): string {
  const keys = key.split('.')
  let value: any = TRANSLATIONS[locale]
  for (const k of keys) {
    value = value?.[k]
  }
  return value || key
}

// Get localized content from item
export function getLocalizedContent(item: any, locale: Locale): any {
  if (!item) return null
  const data = item.data || {}
  const translations = data.translations?.[locale] || {}

  return {
    ...item,
    title: translations.title || translations.name || item.title,
    data: {
      ...data,
      name: translations.name || data.name,
      verdict: translations.verdict || data.verdict,
      pros: translations.pros || data.pros || [],
      cons: translations.cons || data.cons || [],
      excerpt: translations.excerpt || data.excerpt,
      content: translations.content || data.content,
      reviewContent: translations.reviewContent || data.reviewContent,
      description: translations.description || data.description
    }
  }
}

// Detect locale from Accept-Language header
export function detectLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE

  const languages = acceptLanguage.split(',').map(l => l.trim().split('-')[0].toLowerCase())

  for (const lang of languages) {
    if (lang === 'zh' || lang === 'zh-cn' || lang === 'zh-tw') return 'zh'
    if (lang === 'fr') return 'fr'
    if (lang === 'es') return 'es'
    if (lang === 'ru') return 'ru'
    if (lang === 'en') return 'en'
  }

  return DEFAULT_LOCALE
}

// Validate locale
export function isValidLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale)
}
