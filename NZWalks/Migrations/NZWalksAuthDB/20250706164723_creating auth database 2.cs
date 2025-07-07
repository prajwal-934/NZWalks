using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace NZWalks.Migrations.NZWalksAuthDB
{
    /// <inheritdoc />
    public partial class creatingauthdatabase2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "963df2bd-a26b-470d-8dfa-01d491d79e10", "963df2bd-a26b-470d-8dfa-01d491d79e10", "Writer", "WRITER" },
                    { "e68e6c3a-fff5-407a-ac3b-103c09e5e38a", "e68e6c3a-fff5-407a-ac3b-103c09e5e38a", "Reader", "READER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "963df2bd-a26b-470d-8dfa-01d491d79e10");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e68e6c3a-fff5-407a-ac3b-103c09e5e38a");
        }
    }
}
