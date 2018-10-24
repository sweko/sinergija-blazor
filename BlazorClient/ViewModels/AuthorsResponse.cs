namespace BlazorClient.ViewModels {
    public class AuthorsResponse {
        public Author[] Items { get; set; }
        public int Total { get; set; }
        public int First { get; set; }
        public int Last { get; set; }
    }
}