module.exports = [
    {
      key: 'medicine',
      name: 'MEDICINE',
     
      route:"/app/medicine"
    },
    {
      key: 'cosmetics',
      name: 'COSMETICS',
      route:"/app/cosmetics"
    },
    {
      key: 'optics',
      name: 'OPTICS',
      route:"/app/optics"
    },
    {
      key: 'personal_cae',
      name: 'Personal Care',
      child: [
       
        {
          key: 'oral_hygine',
          name: 'Oral Hygine',
          route: '/app/oral_hygine',
          
        },
        {
          key: 'skin_care',
          name: 'Skin Care',
          route: '/app/skin_care',
      
          
        },
        {
          key: 'hair_&_nail_care',
          name: 'Hair & Nail Care',
          route: '/app/hair_nail_care',
          
        },
        {
          key: 'fragnances',
          name: 'Fragnances',
          route: '/app/fragnances',
          
        },
      ]
    },
    {
      key: 'baby_care',
      name: 'Baby Care',
      child: [
       
        {
          key: 'baby_nutrition',
          name: 'Baby Nutrition',
          route: '/app/baby_nutrition',
          
        },
        {
          key: 'baby_bath',
          name: 'Baby Bath',
          route: '/app/baby_bath',
        },
        {
          key: 'baby_essentials',
          name: 'Baby Essentials',
          route: '/app/baby_essentials',
          
        },
      ]
    },
    {
      key: 'lifestyle_fitness',
      name: 'Lifestyle & Fitness',
      child: [
       
        {
          key: 'daily_well_being',
          name: 'Daily Well-Being',
          route: '/app/daily_well_being',
        },
        {
          key: 'men_health',
          name: 'Men Health',
          route: '/app/men_health',
         
        },
        {
          key: 'women_health',
          name: 'Women Health',
          route: '/app/women_health',
        },
       
        {
          key: 'elder_care',
          name: 'Elder Care',
          route: '/app/elder_care',
        },
        
      ]
    },
    {
      key: 'organic',
      name: 'Organic',
      child: [
       
        {
          key: 'homeopethic',
          name: 'Homeopethic',
          route: '/app/homeopethic',
        },
        {
          key: 'organic_health',
          name: 'Organic Health',
          route: '/app/organic_health',
        },
        {
          key: 'herbal_care',
          name: 'Herbal Care',
          route: '/app/herbal_care',
        },
        
      ]
    },
    {
      key: 'health_care_devices',
      name: 'Healthcare Devices',
      child: [
       
        {
          key: 'medical_equipment',
          name: 'Medical Equipment',
          route: '/app/medical_equipment',
        },
        {
          key: 'supports_braces',
          name: 'Supports & Braces',
          route: '/app/supports_braces',
        },
        
      ]
    },
    {
      key: 'prescription',
      name: 'Prescription',
      
      route:"/app/prescription"
    }
   
  ];
  
  
  