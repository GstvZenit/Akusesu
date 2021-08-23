using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class AddedCourseDetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Duration",
                table: "Course",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Institution",
                table: "Course",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Course");

            migrationBuilder.DropColumn(
                name: "Institution",
                table: "Course");
        }
    }
}
