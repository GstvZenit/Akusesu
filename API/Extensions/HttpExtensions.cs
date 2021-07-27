using System.Text.Json;
using API.Helpers;
using Microsoft.AspNetCore.Http;

namespace API.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response, int currentPage, int itemsPerPage,
         int totalItems, int totalPages)
         {
             var paginationHeader= new PaginationHeader(currentPage, itemsPerPage, totalItems, totalPages);
             //opciones serializacion camelCase
             var options = new JsonSerializerOptions
             {
                 PropertyNamingPolicy = JsonNamingPolicy.CamelCase
             };
             //serializando a json
             response.Headers.Add("Pagination", JsonSerializer.Serialize(paginationHeader, options));
             //cors header
             response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
         }
        
    }
}