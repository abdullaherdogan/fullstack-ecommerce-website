using Backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.ServiceAbstracts
{
    public interface ICategoryService
    {
        public List<Category> GetAll();
        public Category Get(int id);
        public Category Update( Category category);
        public Category Create(Category category);
        public Boolean Delete(int id);
    }
}
