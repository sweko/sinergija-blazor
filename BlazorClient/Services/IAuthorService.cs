using BlazorClient.ViewModels;
using System.Threading.Tasks;

namespace BlazorClient.Services {
    public interface IAuthorService
    {
        Task<Author[]> GetAllAuthors();
        
        Task<AuthorsResponse> GetAuthorsFiltered(int first, int last, string search = "");

        Task<Author> GetAuthorById(int authorId);

        Task<Book[]> LoadBooks(int authorId);
    }
}