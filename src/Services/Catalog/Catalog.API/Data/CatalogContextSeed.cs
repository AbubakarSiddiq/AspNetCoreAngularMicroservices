using Catalog.API.Entities;
using MongoDB.Driver;
using System;
using System.Collections.Generic;

namespace Catalog.API.Data
{
    public class CatalogContextSeed
    {
        public static void SeedData(IMongoCollection<Product> productCollection)
        {
            bool existProduct = productCollection.Find(p => true).Any();
            if (!existProduct)
            {
                productCollection.InsertManyAsync(GetPreconfiguredProducts());
            }
        }

        private static IEnumerable<Product> GetPreconfiguredProducts()
        {
            return new List<Product>()
            {
                new Product()
                {
                    Id = "602d2149e773f2a3990b47f5",
                    Name = "Cabbage",
                    Summary = "",
                    Description = "",
                    ImageFile = "cabbage.jpg",
                    Price = 10.00M,
                    Category = "Vegetable"
                },
                new Product()
                {
                    Id = "602d2149e773f2a3990b47f6",
                    Name = "Tomato",
                    Summary = "",
                    Description = "",
                    ImageFile = "tomato.png",
                    Price = 12.00M,
                    Category = "Vegetable"
                },
                new Product()
                {
                    Id = "602d2149e773f2a3990b47f7",
                    Name = "Brinjal",
                    Summary = "",
                    Description = "",
                    ImageFile = "brinjal.jpg",
                    Price = 20.00M,
                    Category = "Vegetable"
                },
                new Product()
                {
                    Id = "602d2149e773f2a3990b47f8",
                    Name = "Beetroot",
                    Summary = "",
                    Description = "",
                    ImageFile = "beetroot.jpg",
                    Price = 8.00M,
                    Category = "Vegetable"
                },
                new Product()
                {
                    Id = "602d2149e773f2a3990b47f9",
                    Name = "Onion",
                    Summary = "",
                    Description = "",
                    ImageFile = "onion.jpg",
                    Price = 10.00M,
                    Category = "Vegetable"
                },
                new Product()
                {
                    Id = "602d2149e773f2a3990b47fa",
                    Name = "Ginger",
                    Summary = "",
                    Description = "",
                    ImageFile = "ginger.jpg",
                    Price = 8.00M,
                    Category = "Vegetable"
                }
            };
        }
    }
}
