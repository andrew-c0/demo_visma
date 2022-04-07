﻿// <auto-generated />
using System;
using FurnitureOrder.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace backend.Migrations.OrderDbMigrations
{
    [DbContext(typeof(OrderDb))]
    [Migration("20220407205951_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.0");

            modelBuilder.Entity("FurnitureOrder.Models.Order", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("created_at")
                        .HasColumnType("TEXT");

                    b.Property<int?>("current_statusid")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("updated_at")
                        .HasColumnType("TEXT");

                    b.Property<int?>("userid")
                        .HasColumnType("INTEGER");

                    b.HasKey("id");

                    b.HasIndex("current_statusid");

                    b.HasIndex("userid");

                    b.ToTable("Order");
                });

            modelBuilder.Entity("FurnitureOrder.Models.OrderStatus", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("name")
                        .HasColumnType("TEXT");

                    b.HasKey("id");

                    b.ToTable("OrderStatus");
                });

            modelBuilder.Entity("FurnitureUser.Models.User", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("created_at")
                        .HasColumnType("TEXT");

                    b.Property<string>("fullname")
                        .HasColumnType("TEXT");

                    b.Property<bool>("is_active")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("is_client")
                        .HasColumnType("INTEGER");

                    b.Property<string>("password")
                        .HasColumnType("TEXT");

                    b.Property<string>("username")
                        .HasColumnType("TEXT");

                    b.HasKey("id");

                    b.ToTable("User");
                });

            modelBuilder.Entity("FurnitureOrder.Models.Order", b =>
                {
                    b.HasOne("FurnitureOrder.Models.OrderStatus", "current_status")
                        .WithMany()
                        .HasForeignKey("current_statusid");

                    b.HasOne("FurnitureUser.Models.User", "user")
                        .WithMany()
                        .HasForeignKey("userid");

                    b.Navigation("current_status");

                    b.Navigation("user");
                });
#pragma warning restore 612, 618
        }
    }
}
