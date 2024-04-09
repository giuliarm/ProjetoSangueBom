import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/authService";

interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  logged?: boolean;
}

export const ROUTES: RouteInfo[] = [
  {
    path: "/home",
    title: "Projeto Sangue Bom",
    icon: "ni-favourite-28 text-red",
    class: "",
  },
  {
    path: "/maps",
    title: "Onde Doar",
    icon: "ni-pin-3 text-orange",
    class: "",
  },
  {
    path: "/user-profile",
    title: "Perfil",
    icon: "ni-single-02 text-yellow",
    class: "",
    logged: true,
  },
  {
    path: "/login",
    title: "Login",
    icon: "ni-key-25 text-info",
    class: "",
    logged: false,
  },
  {
    path: "/register",
    title: "Cadastro",
    icon: "ni-circle-08 text-pink",
    class: "",
    logged: false,
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  menuItems: RouteInfo[] = [];
  isCollapsed = true;
  logged = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.logged = this.authService.getIsLogged();
    this.updateMenu();
    this.router.events.subscribe(() => {
      this.isCollapsed = true;
    });
  }

  private updateMenu(): void {
    console.log(this.logged)
    this.menuItems = ROUTES.filter(
      (menuItem) =>
        menuItem.logged === undefined || menuItem.logged === this.logged
    );
  }

  updateMenuState(logged: boolean): void {
    this.logged = logged;
    this.updateMenu();
  }

  logout() {
    this.authService
      .logout()
      .then(() => {
        alert("Você foi desconectado com sucesso!");
        this.router.navigate(["/home"]);
      })
      .catch((error) => {
        console.error("Erro ao fazer logout", error);
      });
  }
}
