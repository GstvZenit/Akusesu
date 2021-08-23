namespace API.Helpers
{
    public class CourseParams : PaginationParams
    {
        public string CurrentName { get; set; }
        public string Category { get; set; }
        public string CurrentUsername { get; set; } // del usuario logeado(instructor username)
        public int CurrentUserId { get; set; } // del usuario logeado(instructor id)
        public string OrderBy{ get; set; } = "dateCreated";

    }
}