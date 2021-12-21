using Backend.Data;
using Backend.Entities;
using Backend.ServiceAbstracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.ServiceImplementations
{
    public class CategoryService : ICategoryService
    {
        private readonly ApplicationDbContext _context;
        public CategoryService(ApplicationDbContext context)
        {
            _context = context;
        }
        public Category Create(Category category)
        {
            category.CreateDate = DateTime.Now;
            _context.Categories.Add(category);
            _context.SaveChanges();
            return category;
        }

        public Boolean Delete(int id)
        {
            Category category = _context.Categories.Where(x => x.Id == id).SingleOrDefault();
            List<Product> productsOfCategory = _context.Products.Where(x => x.CategoryId == id).ToList<Product>();
            if (productsOfCategory.Count()>0)
            {
                return false;
            }
            _context.Categories.Remove(category);
            _context.SaveChanges();
            return true;
        }

        public Category Get(int id)
        {
            Category category = _context.Categories.Where(x => x.Id == id).SingleOrDefault();
            return category;
        }

        public List<Category> GetAll()
        {
            List<Category> categories = _context.Categories.ToList<Category>();
            return categories;
        }

        public Category Update( Category category)
        {
            category.UpdateDate =  DateTime.Now;
            _context.Entry(category).State = EntityState.Modified;
            _context.SaveChanges();
            return category;
        }
    }
}
