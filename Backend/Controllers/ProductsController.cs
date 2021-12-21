using Backend.Entities;
using Backend.UnitOfWork;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public ProductsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public ActionResult<List<Product>> GetAll()
        {
            List<Product> products = _unitOfWork.ProductService.GetAll();
            return Ok(products);
        }
        [HttpGet("{categoryId}")]
        public ActionResult<List<Product>> GetAll(int categoryId)
        {
            List<Product> products = _unitOfWork.ProductService.GetAll(categoryId);
            return Ok(products);
        }
        [HttpGet("product/{id}")]
        public ActionResult<Product> Get(int id)
        {
            Product product = _unitOfWork.ProductService.Get(id);
            return Ok(product);
        }

        [HttpPost]
        public ActionResult<Product> Create(Product product)
        {
            product.CreateDate = DateTime.Now;
            Product _product = _unitOfWork.ProductService.Create(product);
            return Ok(_product);
        }

        [HttpPut]
        public ActionResult<Product> Update(Product product)
        {
            product.UpdateDate = DateTime.Now;
            Product _product = _unitOfWork.ProductService.Update(product);
            return Ok(_product);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Boolean isOk = _unitOfWork.ProductService.Delete(id);
            if (isOk==false)
            {
                return BadRequest();
            }
            return Ok();
        }

    }
}
