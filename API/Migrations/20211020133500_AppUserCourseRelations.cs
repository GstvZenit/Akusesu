using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class AppUserCourseRelations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enroll_AspNetUsers_UserId",
                table: "Enroll");

            migrationBuilder.DropIndex(
                name: "IX_Enroll_UserId",
                table: "Enroll");

            migrationBuilder.AddForeignKey(
                name: "FK_Enroll_AspNetUsers_sourceUserId",
                table: "Enroll",
                column: "sourceUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enroll_AspNetUsers_sourceUserId",
                table: "Enroll");

            migrationBuilder.CreateIndex(
                name: "IX_Enroll_UserId",
                table: "Enroll",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Enroll_AspNetUsers_UserId",
                table: "Enroll",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
