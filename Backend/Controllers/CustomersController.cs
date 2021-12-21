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
    public class CustomersController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public CustomersController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public ActionResult<List<Customer>> GetAll()
        {
            List<Customer> customers = _unitOfWork.CustomerService.GetAll();
            return Ok(customers);
        }
        [HttpGet("{id}")]
        public ActionResult<Customer> Get(int id)
        {
            Customer customer = _unitOfWork.CustomerService.Get(id);
            return Ok(customer);
        }
        [HttpPost]
        public ActionResult<Customer> Create(Customer customer)
        {
            customer.CreateDate = DateTime.Now;
            Customer _customer = _unitOfWork.CustomerService.Create(customer);
            return Ok(_customer);
        }
        [HttpPut]
        public ActionResult<Customer> Update(Customer customer)
        {
            customer.UpdateDate = DateTime.Now;
            Customer _customer = _unitOfWork.CustomerService.Update(customer);
            return Ok(_customer);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Boolean isOk = _unitOfWork.CustomerService.Delete(id);
            if (isOk==false)
            {
                return BadRequest();
            }
            return Ok();
        }
    }
}
