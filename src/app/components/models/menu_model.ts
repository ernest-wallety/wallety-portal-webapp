export class MenuAccessModel {
  moduleId?: string;
  moduleName?: string;
  moduleDescription?: string;
  moduleIcon?: string;
  moduleRoute?: string;
  moduleSortOrder?: number;
  moduleIsActive?: boolean;
  moduleRequireAdmin?: boolean;
  moduleSidebarClass?: string;

  moduleItemId?: string;
  moduleItemName?: string;
  moduleItemDescription?: string;
  moduleItemIcon?: string;
  moduleItemRoute?: string;
  moduleItemSortOrder?: number;
  moduleItemIsActive?: boolean;
  moduleItemRequireAdmin?: boolean;

  roleName?: string;
  roleCode?: string;

  userId?: string;
  firstName?: string;
  surname?: string;

  hide?: boolean;
}

export class MenuListModel {
  moduleId?: string;
  moduleName?: string;
  moduleDescription?: string;
  moduleIcon?: string;
  moduleRoute?: string;
  moduleSortOrder?: number;
  moduleIsActive?: boolean;
  moduleRequireAdmin?: boolean;
  moduleSidebarClass?: string;

  moduleItems?: MenuAccessModel[];
}
