using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Blazor;
using BlazorClient.ViewModels;

namespace BlazorClient.Services
{
    public class AuthorService: IAuthorService
    {

        private string serverUrl = "http://localhost:3000/api/authors";

        private HttpClient http;

        public AuthorService(HttpClient http)
        {
            this.http = http;
        }

        public async Task<Author[]> GetAllAuthors()
        {
            var authors = await this.http.GetJsonAsync<AuthorsResponse>(serverUrl);
            return authors.Items;
        }

        public async Task<AuthorsResponse> GetAuthorsFiltered(int first, int last, string search = "")
        {
            var url = $"{serverUrl}/{first}/{last}";
            if (!string.IsNullOrEmpty(search)) {
                url = $"{url}?search={search}";
            }
            var authors = await this.http.GetJsonAsync<AuthorsResponse>(url);
            return authors;
        }

        public async Task<Author> GetAuthorById(int authorId){
            var url = $"{serverUrl}/id/{authorId}";
            var author = await this.http.GetJsonAsync<Author>(url);
            return author;
        }

        public async Task<Book[]> LoadBooks(int authorId) {
            var url = $"{serverUrl}/{authorId}/books/load";
            var books = await this.http.GetJsonAsync<Book[]>(url);
            return books;
        }


    }
}