using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class AppUserCourseCustomMergeAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppUserCourse_AspNetUsers_UserId",
                table: "AppUserCourse");

            migrationBuilder.DropForeignKey(
                name: "FK_AppUserCourse_Course_CourseId",
                table: "AppUserCourse");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppUserCourse",
                table: "AppUserCourse");

            migrationBuilder.RenameTable(
                name: "AppUserCourse",
                newName: "Enroll");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Enroll",
                newName: "sourceUserId");

            migrationBuilder.RenameIndex(
                name: "IX_AppUserCourse_UserId",
                table: "Enroll",
                newName: "IX_Enroll_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_AppUserCourse_CourseId",
                table: "Enroll",
                newName: "IX_Enroll_CourseId");

            migrationBuilder.AlterColumn<int>(
                name: "sourceUserId",
                table: "Enroll",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Enroll",
                table: "Enroll",
                columns: new[] { "sourceUserId", "CourseId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Enroll_AspNetUsers_UserId",
                table: "Enroll",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Enroll_Course_CourseId",
                table: "Enroll",
                column: "CourseId",
                principalTable: "Course",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enroll_AspNetUsers_UserId",
                table: "Enroll");

            migrationBuilder.DropForeignKey(
                name: "FK_Enroll_Course_CourseId",
                table: "Enroll");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Enroll",
                table: "Enroll");

            migrationBuilder.RenameTable(
                name: "Enroll",
                newName: "AppUserCourse");

            migrationBuilder.RenameColumn(
                name: "sourceUserId",
                table: "AppUserCourse",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_Enroll_UserId",
                table: "AppUserCourse",
                newName: "IX_AppUserCourse_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Enroll_CourseId",
                table: "AppUserCourse",
                newName: "IX_AppUserCourse_CourseId");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "AppUserCourse",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppUserCourse",
                table: "AppUserCourse",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AppUserCourse_AspNetUsers_UserId",
                table: "AppUserCourse",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AppUserCourse_Course_CourseId",
                table: "AppUserCourse",
                column: "CourseId",
                principalTable: "Course",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
