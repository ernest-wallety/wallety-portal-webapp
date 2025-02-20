export class MenuAccessModel {
  ModuleId?: string;
  ModuleName?: string;
  ModuleDescription?: string;
  ModuleIcon?: string;
  ModuleRoute?: string;
  ModuleSortOrder?: number;
  ModuleIsActive?: boolean;
  ModuleRequireAdmin?: boolean;
  ModuleSidebarClass?: string;

  ModuleItemId?: string;
  ModuleItemName?: string;
  ModuleItemDescription?: string;
  ModuleItemIcon?: string;
  ModuleItemRoute?: string;
  ModuleItemSortOrder?: number;
  ModuleItemIsActive?: boolean;
  ModuleItemRequireAdmin?: boolean;

  RoleName?: string;
  RoleCode?: string;

  UserId?: string;
  FirstName?: string;
  Surname?: string;

  Hide?: boolean;
}

export class MenuListModel {
  ModuleId?: string;
  ModuleName?: string;
  ModuleDescription?: string;
  ModuleIcon?: string;
  ModuleRoute?: string;
  ModuleSortOrder?: number;
  ModuleIsActive?: boolean;
  ModuleRequireAdmin?: boolean;
  ModuleSidebarClass?: string;

  ModuleItems?: MenuAccessModel[];
}
