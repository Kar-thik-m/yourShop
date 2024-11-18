const dummyProducts = [
    {
      _id: "1",
      Productname: "Apple iPhone 15",
      price: 79999,
      description: "The latest iPhone with advanced features and 5G connectivity.",
      ratings: "4.5",
      itemimage: {
        url: "https://via.placeholder.com/250x250?text=Apple+iPhone+15",
      },
      category: "Mobiles",
      seller: "Apple Store",
      stock: 30,
      numOfReviews: 120,
      reviews: [
        {
          user: "User1",
          rating: "5",
          comment: "Amazing phone with great camera quality!",
        },
        {
          user: "User2",
          rating: "4",
          comment: "Good performance but expensive.",
        },
      ],
      createdAt: new Date(),
    },
    {
      _id: "2",
      Productname: "Samsung Galaxy S23",
      price: 74999,
      description: "Samsung's flagship smartphone with stunning display and camera.",
      ratings: "4.7",
      itemimage: {
        url: "https://via.placeholder.com/250x250?text=Samsung+Galaxy+S23",
      },
      category: "Mobiles",
      seller: "Samsung Store",
      stock: 50,
      numOfReviews: 200,
      reviews: [
        {
          user: "User3",
          rating: "5",
          comment: "Best smartphone experience ever!",
        },
        {
          user: "User4",
          rating: "4",
          comment: "Great phone but lacks some features.",
        },
      ],
      createdAt: new Date(),
    },
    {
      _id: "3",
      Productname: "Sony WH-1000XM5 Headphones",
      price: 29999,
      description: "Noise-canceling over-ear headphones with superior sound quality.",
      ratings: "4.8",
      itemimage: {
        url: "https://via.placeholder.com/250x250?text=Sony+WH-1000XM5",
      },
      category: "Electronics",
      seller: "Sony Store",
      stock: 15,
      numOfReviews: 50,
      reviews: [
        {
          user: "User5",
          rating: "5",
          comment: "Best noise-canceling headphones!",
        },
        {
          user: "User6",
          rating: "4",
          comment: "Good sound quality but the price is a bit high.",
        },
      ],
      createdAt: new Date(),
    },
    {
      _id: "4",
      Productname: "Samsung 55-inch 4K Smart TV",
      price: 54999,
      description: "4K Ultra HD Smart TV with stunning visuals and smart features.",
      ratings: "4.6",
      itemimage: {
        url: "https://via.placeholder.com/250x250?text=Samsung+55-inch+4K+TV",
      },
      category: "Electronics",
      seller: "Samsung Store",
      stock: 10,
      numOfReviews: 80,
      reviews: [
        {
          user: "User7",
          rating: "5",
          comment: "Great picture quality and smart features.",
        },
        {
          user: "User8",
          rating: "4",
          comment: "Good TV but the sound quality could be better.",
        },
      ],
      createdAt: new Date(),
    },
    {
      _id: "5",
      Productname: "Dell XPS 13 Laptop",
      price: 99999,
      description: "Premium ultrabook with Intel i7 processor and 16GB RAM.",
      ratings: "4.9",
      itemimage: {
        url: "https://via.placeholder.com/250x250?text=Dell+XPS+13",
      },
      category: "Computers",
      seller: "Dell Store",
      stock: 20,
      numOfReviews: 150,
      reviews: [
        {
          user: "User9",
          rating: "5",
          comment: "Amazing laptop, lightweight, and fast performance!",
        },
        {
          user: "User10",
          rating: "4",
          comment: "Expensive but worth the performance.",
        },
      ],
      createdAt: new Date(),
    },
    {
      _id: "6",
      Productname: "Nike Air Max 2023",
      price: 9999,
      description: "Stylish and comfortable sneakers for running and casual wear.",
      ratings: "4.3",
      itemimage: {
        url: "https://via.placeholder.com/250x250?text=Nike+Air+Max+2023",
      },
      category: "Fashion",
      seller: "Nike Store",
      stock: 100,
      numOfReviews: 75,
      reviews: [
        {
          user: "User11",
          rating: "4",
          comment: "Very comfortable but the color options are limited.",
        },
        {
          user: "User12",
          rating: "4",
          comment: "Great for running, but a bit heavy for daily use.",
        },
      ],
      createdAt: new Date(),
    },
    {
      _id: "7",
      Productname: "Adidas UltraBoost 22",
      price: 12999,
      description: "Top-rated running shoes with unmatched comfort and performance.",
      ratings: "4.7",
      itemimage: {
        url: "https://via.placeholder.com/250x250?text=Adidas+UltraBoost+22",
      },
      category: "Fashion",
      seller: "Adidas Store",
      stock: 60,
      numOfReviews: 150,
      reviews: [
        {
          user: "User13",
          rating: "5",
          comment: "Best running shoes I've ever worn!",
        },
        {
          user: "User14",
          rating: "4",
          comment: "Slightly expensive, but the comfort is amazing.",
        },
      ],
      createdAt: new Date(),
    },
    {
      _id: "8",
      Productname: "LG 32-inch Full HD Monitor",
      price: 17999,
      description: "Full HD monitor with IPS panel for stunning visuals.",
      ratings: "4.5",
      itemimage: {
        url: "https://via.placeholder.com/250x250?text=LG+32-inch+Monitor",
      },
      category: "Computers",
      seller: "LG Store",
      stock: 25,
      numOfReviews: 60,
      reviews: [
        {
          user: "User15",
          rating: "5",
          comment: "Great color accuracy and screen quality.",
        },
        {
          user: "User16",
          rating: "4",
          comment: "Good monitor but could use better contrast.",
        },
      ],
      createdAt: new Date(),
    },
    {
      _id: "9",
      Productname: "Canon EOS 90D DSLR Camera",
      price: 74990,
      description: "High-performance DSLR camera with 4K video recording.",
      ratings: "4.6",
      itemimage: {
        url: "https://via.placeholder.com/250x250?text=Canon+EOS+90D",
      },
      category: "Electronics",
      seller: "Canon Store",
      stock: 8,
      numOfReviews: 90,
      reviews: [
        {
          user: "User17",
          rating: "5",
          comment: "Fantastic camera with great autofocus and video quality.",
        },
        {
          user: "User18",
          rating: "4",
          comment: "Excellent performance, but a bit bulky for travel.",
        },
      ],
      createdAt: new Date(),
    },
    {
      _id: "10",
      Productname: "Fitbit Charge 5",
      price: 12999,
      description: "Advanced fitness tracker with built-in GPS and heart rate monitor.",
      ratings: "4.4",
      itemimage: {
        url: "https://via.placeholder.com/250x250?text=Fitbit+Charge+5",
      },
      category: "Accessories",
      seller: "Fitbit Store",
      stock: 150,
      numOfReviews: 120,
      reviews: [
        {
          user: "User19",
          rating: "5",
          comment: "Perfect fitness tracker, easy to use and accurate.",
        },
        {
          user: "User20",
          rating: "4",
          comment: "Good for tracking workouts, but the battery life could be better.",
        },
      ],
      createdAt: new Date(),
    },
  ];
  
  export default dummyProducts;
  