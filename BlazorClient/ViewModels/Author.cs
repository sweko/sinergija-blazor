namespace BlazorClient.ViewModels {
    public class Author {
        public int WweId { get; set; }
        public string Name { get; set; }
        public int BookCount { get; set; }

        public Book[] Books {get; set; }
    }
}