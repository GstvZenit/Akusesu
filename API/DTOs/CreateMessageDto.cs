namespace API.DTOs
{
    public class CreateMessageDto
    {
        //Dto Mensaje adicional para configurar DTO, entidad, repositorio
        public string RecipientUsername { get; set; }
        public string Content { get; set; }
    }
}