using Backend.Entities;
using Backend.UnitOfWork;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [EnableCors()]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public CategoriesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public ActionResult<List<Category>> GetAll()
        {
            List<Category> categories = _unitOfWork.CategoryService.GetAll();
            return Ok(categories);
        }
        [HttpGet("{id}")]
        public ActionResult<Category> Get(int id)
        {
            Category category = _unitOfWork.CategoryService.Get(id);
            return Ok(category);
        }
        [HttpPost]
        public ActionResult<Category> Create(Category category)
        {
            Category _category = _unitOfWork.CategoryService.Create(category);
            return Ok(_category);
        }
        [HttpPut]
        public ActionResult<Category> Update(Category category)
        {
            _unitOfWork.CategoryService.Update(category);
            return Ok(category);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Boolean isOk = _unitOfWork.CategoryService.Delete(id);
            if (isOk==false)
            {
                return BadRequest();
            }
            return Ok();
        }
    }
}
