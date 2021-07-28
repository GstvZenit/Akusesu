namespace API.Helpers
{
    public class UserParams : PaginationParams
    {
         
        public string CurrentUsername { get; set; }
        public string Gender { get; set; }
        //rollback
        public int MinAge { get; set; } = 18;
        public int MaxAge { get; set; } = 120;
        public string OrderBy{ get; set; } = "lastActive";

    }
}