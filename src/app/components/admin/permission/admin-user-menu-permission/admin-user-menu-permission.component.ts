import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { TreeNode } from "primeng/api";
import { MenuService } from "../../Services/menu.service";

@Component({
  selector: 'app-admin-user-menu-permission',
  templateUrl: './admin-user-menu-permission.component.html',
  styleUrls: ['./admin-user-menu-permission.component.scss']
})
export class AdminUserMenuPermissionComponent implements OnInit {

  items: any[];
  allItems: any[];
  selectedFiles2: TreeNode[];
  myForm: FormGroup;
  customForm: FormGroup;
  userName: any;
  userId: number = 0;
  constructor(
    public menuService: MenuService,
    private toaster: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initModelForm();
  }

  GetMenuList(userId: number) {
    debugger
    //console.log(userId);
    this.userId = userId;

    this.menuService.GetMenusByAdminUserId(userId).subscribe(
      (res) => {
        if (res) {
          console.log(JSON.stringify(res));
          this.allItems = res;
          res.forEach((a) => {
            // console.log(a);
            var formControl: FormGroup = this.BlankNewMenuPermission(a);
            this.MenuPermission().push(formControl);
            if (a.appUserDataPermissionList != null) {
              a.appUserDataPermissionList.forEach((element) => {
                var formControl1: FormGroup =
                  this.BlankNewMenuActionPermission(element);
                this.ActionPermission().push(formControl1);
              });
            }
          });
          //console.log(this.myForm);
          //this.myForm.patchValue(res);
          this.items = this.menuService.treeiftForChildren(
            res,
            "id",
            "parentId",
            "children"
          );
          //console.log(JSON.stringify(this.items));
        }
      },
      (error) => { }
    );
  }

  initModelForm() {
    this.myForm = this.fb.group({
      myChoices: new FormArray([]),
      actionChoices: new FormArray([]),
    });
    // return this.fb.group({
    //   otherControls: [""],
    //   // The formArray, empty
    //   myChoices: new FormArray([]),
    // });
  }

  onCheckChange1(event) {
    console.log(event.target.value);
    const formArray1: FormArray = this.myForm.get("myChoices") as FormArray;

    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      //formArray.push(new FormControl(event.target.value));
      let i: number = 0;

      formArray1.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value.id == event.target.value) {
          // Remove the unselected element from the arrayForm
          //formArray.removeAt(i);
          ctrl.patchValue({
            isSelected: true,
          });
          return;
        }

        i++;
      });
    } else {
      /* unselected */
      // find the unselected element
      let i: number = 0;

      formArray1.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value.id == event.target.value) {
          // Remove the unselected element from the arrayForm
          //formArray.removeAt(i);
          ctrl.patchValue({
            isSelected: false,
          });
          return;
        }

        i++;
      });
    }
  }

  onCheckChange(event) {
    const formArray: FormArray = this.myForm.get("myChoices") as FormArray;
    const formArray1: FormArray = this.myForm.get("actionChoices") as FormArray;


    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      //formArray.push(new FormControl(event.target.value));

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value.id == event.target.value) {
          // Remove the unselected element from the arrayForm
          //formArray.removeAt(i);
          var singleItem = this.items.find(x => x.id == event.target.value);
          if (singleItem != null) {
            if (singleItem.parentId == 0) {
              ctrl.patchValue({
                isSelected: true,
              });
              //1ST CHILD
              var lstAllChild = singleItem.children.filter(x => x.parentId == singleItem.id);
              lstAllChild.forEach((echild) => {
                echild.isSelected = true;
                formArray.controls.forEach(element => {
                  if (element.value.id == echild.id) {
                    element.patchValue({
                      isSelected: true,
                    });
                  }
                });

                //2ND CHILD
                var lstChildofChild = echild.children.filter(c => c.parentId == echild.id);
                lstChildofChild.forEach(cocElem => {
                  cocElem.isSelected = true;
                  formArray.controls.forEach(elements => {
                    if (elements.value.id == cocElem.id) {
                      elements.patchValue({
                        isSelected: true,
                      });
                    }
                  });
                  //3RD CHILD
                  var lst3rdChild = cocElem.children.filter(c => c.parentId == cocElem.id);
                  lst3rdChild.forEach(thirdChildElem => {
                    thirdChildElem.isSelected = true;
                    formArray.controls.forEach(thirdelements => {
                      if (thirdelements.value.id == cocElem.id) {
                        thirdelements.patchValue({
                          isSelected: true,
                        });
                      }
                    });
                    if (thirdChildElem.children.length > 0) {
                      //future work
                    } else {
                      var lstAppUserDataPerm = thirdChildElem.appUserDataPermissionList;
                      lstAppUserDataPerm.forEach(elementP => {
                        elementP.isSelected = true;
                        formArray1.controls.forEach(menuActionSetup => {
                          if (menuActionSetup.value.actionSetupId == elementP.actionSetupId) {
                            menuActionSetup.patchValue({
                              isSelected: true,
                            });
                          }
                        });
                      });
                    }
                  });

                  if (cocElem.appUserDataPermissionList.length > 0) {
                    var lstAppUserDataPer = cocElem.appUserDataPermissionList;
                    lstAppUserDataPer.forEach(element => {
                      element.isSelected = true;
                      formArray1.controls.forEach(menuActionSetup => {
                        if (menuActionSetup.value.actionSetupId == element.actionSetupId) {
                          menuActionSetup.patchValue({
                            isSelected: true,
                          });
                        }
                      });
                    });
                  }
                });
              });
              return;
            } else {

              ctrl.patchValue({
                isSelected: true,
              });
              return;
            }
          } else {
            //1st TO 2nd CHILD
            var objFirChildToSecChild = this.allItems.find(x => x.id == event.target.value);
            if (objFirChildToSecChild != null && objFirChildToSecChild.children.length > 0) {
              var lstFirstCoc = objFirChildToSecChild.children.filter(x => x.parentId == objFirChildToSecChild.id);
              lstFirstCoc.forEach((echild) => {
                echild.isSelected = true;
                formArray.controls.forEach(element => {
                  if (element.value.id == echild.id) {
                    element.patchValue({
                      isSelected: true,
                    });
                  }
                });
                if (echild.children.length > 0) {
                  //2ND to 3rd CHILD
                  var lst2ndChildTo3rdChild = echild.children.filter(c => c.parentId == echild.id);
                  lst2ndChildTo3rdChild.forEach(cocElem => {
                    cocElem.isSelected = true;
                    formArray.controls.forEach(elements => {
                      if (elements.value.id == cocElem.id) {
                        elements.patchValue({
                          isSelected: true,
                        });
                      }
                    });
                    ///
                    if (cocElem.children.length > 0) {
                      //future work
                    } else {
                      var lstAppUserDataPerm = cocElem.appUserDataPermissionList;
                      lstAppUserDataPerm.forEach(elementP => {
                        elementP.isSelected = true;
                        formArray1.controls.forEach(menuActionSetup => {
                          if (menuActionSetup.value.actionSetupId == elementP.actionSetupId) {
                            menuActionSetup.patchValue({
                              isSelected: true,
                            });
                          }
                        });
                      });
                    }
                  });
                } else {
                  var lstAppUserDataPer = echild.appUserDataPermissionList;
                  lstAppUserDataPer.forEach(element => {
                    element.isSelected = true;
                    formArray1.controls.forEach(menuActionSetup => {
                      if (menuActionSetup.value.actionSetupId == element.actionSetupId) {
                        menuActionSetup.patchValue({
                          isSelected: true,
                        });
                      }
                    });
                  });
                }
              });
            } else if (objFirChildToSecChild.appUserDataPermissionList.length > 0) {
              var lstAppUserDataPer = objFirChildToSecChild.appUserDataPermissionList;
              lstAppUserDataPer.forEach(element => {
                element.isSelected = true;
                formArray1.controls.forEach(menuActionSetup => {
                  if (menuActionSetup.value.actionSetupId == element.actionSetupId) {
                    menuActionSetup.patchValue({
                      isSelected: true,
                    });
                  }
                });
              });
            }
            ctrl.patchValue({
              isSelected: true,
            });
            return;
          }
        }
      });
    } else {
      /* unselected */
      // find the unselected element


      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value.id == event.target.value) {
          // Remove the unselected element from the arrayForm
          //formArray.removeAt(i);
          var singleItem = this.items.find(x => x.id == event.target.value);
          if (singleItem != null) {
            if (singleItem.parentId == 0) {
              ctrl.patchValue({
                isSelected: false,
              });
              //1ST CHILD
              var lstAllChild = singleItem.children.filter(x => x.parentId == singleItem.id);
              lstAllChild.forEach((echild) => {
                echild.isSelected = false;
                formArray.controls.forEach(element => {
                  if (element.value.id == echild.id) {
                    element.patchValue({
                      isSelected: false,
                    });
                  }
                });

                //2ND CHILD
                var lstChildofChild = echild.children.filter(c => c.parentId == echild.id);
                lstChildofChild.forEach(cocElem => {
                  cocElem.isSelected = false;
                  formArray.controls.forEach(elements => {
                    if (elements.value.id == cocElem.id) {
                      elements.patchValue({
                        isSelected: false,
                      });
                    }
                  });
                  //3RD CHILD
                  var lst3rdChild = cocElem.children.filter(c => c.parentId == cocElem.id);
                  lst3rdChild.forEach(thirdChildElem => {
                    thirdChildElem.isSelected = false;
                    formArray.controls.forEach(thirdelements => {
                      if (thirdelements.value.id == cocElem.id) {
                        thirdelements.patchValue({
                          isSelected: false,
                        });
                      }
                    });

                    if (thirdChildElem.children.length > 0) {
                      //future work
                    } else {
                      var lstAppUserDataPerm = thirdChildElem.appUserDataPermissionList;
                      lstAppUserDataPerm.forEach(elementP => {
                        elementP.isSelected = false;
                        formArray1.controls.forEach(menuActionSetup => {
                          if (menuActionSetup.value.actionSetupId == elementP.actionSetupId) {
                            menuActionSetup.patchValue({
                              isSelected: false,
                            });
                          }
                        });
                      });
                    }
                  });

                  if (cocElem.appUserDataPermissionList.length > 0) {
                    var lstAppUserDataPer = cocElem.appUserDataPermissionList;
                    lstAppUserDataPer.forEach(element => {
                      element.isSelected = false;
                      formArray1.controls.forEach(menuActionSetup => {
                        if (menuActionSetup.value.actionSetupId == element.actionSetupId) {
                          menuActionSetup.patchValue({
                            isSelected: false,
                          });
                        }
                      });
                    });
                  }
                });
              });
              return;
            } else {
              ctrl.patchValue({
                isSelected: false,
              });
              return;
            }
          } else {
            //1st to 2nd CHILD
            var objFirstChildToSecChild = this.allItems.find(x => x.id == event.target.value);
            if (objFirstChildToSecChild != null && objFirstChildToSecChild.children.length > 0) {
              var lstFirstCoc = objFirstChildToSecChild.children.filter(x => x.parentId == objFirstChildToSecChild.id);
              lstFirstCoc.forEach((echild) => {
                echild.isSelected = false;
                formArray.controls.forEach(element => {
                  if (element.value.id == echild.id) {
                    element.patchValue({
                      isSelected: false,
                    });
                  }
                });
                if (echild.children.length > 0) {
                  //2ND to 3rd CHILD
                  var lst2ndChildTo3rdChild = echild.children.filter(c => c.parentId == echild.id);
                  lst2ndChildTo3rdChild.forEach(cocElem => {
                    cocElem.isSelected = false;
                    formArray.controls.forEach(elements => {
                      if (elements.value.id == cocElem.id) {
                        elements.patchValue({
                          isSelected: false,
                        });
                      }
                    });
                    if (cocElem.children.length > 0) {
                      //future work
                    } else {
                      var lstAppUserDataPerm = cocElem.appUserDataPermissionList;
                      lstAppUserDataPerm.forEach(elementPe => {
                        elementPe.isSelected = false;
                        formArray1.controls.forEach(menuActionSetups => {
                          if (menuActionSetups.value.actionSetupId == elementPe.actionSetupId) {
                            menuActionSetups.patchValue({
                              isSelected: false,
                            });
                          }
                        });
                      });
                    }
                  });
                } else {
                  var lstAppUserDataPer = echild.appUserDataPermissionList;
                  lstAppUserDataPer.forEach(element => {
                    element.isSelected = false;
                    formArray1.controls.forEach(menuActionSetup => {
                      if (menuActionSetup.value.actionSetupId == element.actionSetupId) {
                        menuActionSetup.patchValue({
                          isSelected: false,
                        });
                      }
                    });
                  });
                }
              });
            } else if (objFirstChildToSecChild.appUserDataPermissionList.length > 0) {
              var lstAppUserDataPer = objFirstChildToSecChild.appUserDataPermissionList;
              lstAppUserDataPer.forEach(element => {
                element.isSelected = false;
                formArray1.controls.forEach(menuActionSetup => {
                  if (menuActionSetup.value.actionSetupId == element.actionSetupId) {
                    menuActionSetup.patchValue({
                      isSelected: false,
                    });
                  }
                });
              });
            }
            ctrl.patchValue({
              isSelected: false,
            });
            return;
          }
        }
        //i++;
      });
    }
  }

  onActionCheckChange(event) {
    console.log(event.target.value);
    const formArray1: FormArray = this.myForm.get("actionChoices") as FormArray;

    /* Selected */
    if (event.target.checked) {
      formArray1.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value.id == event.target.value) {
          // Remove the unselected element from the arrayForm
          //formArray.removeAt(i);
          var singleItem = this.items.find(x => x.id == event.target.value);
          if (singleItem != null) {
            if (singleItem.parentId == 0) {
              ctrl.patchValue({
                isSelected: true,
              });

              //1ST CHILD
              var lstAllChild = singleItem.children.filter(x => x.parentId == singleItem.id);
              lstAllChild.forEach((echild) => {
                echild.isSelected = true;
                formArray1.controls.forEach(element => {
                  if (element.value.id == echild.id) {
                    element.patchValue({
                      isSelected: true,
                    });
                  }
                });

                //2ND CHILD
                var lstChildofChild = echild.children.filter(c => c.parentId == echild.id);
                lstChildofChild.forEach(cocElem => {
                  cocElem.isSelected = true;
                  formArray1.controls.forEach(elements => {
                    if (elements.value.id == cocElem.id) {
                      elements.patchValue({
                        isSelected: true,
                      });
                    }
                  });
                  //3RD CHILD
                  var lst3rdChild = cocElem.children.filter(c => c.parentId == cocElem.id);
                  lst3rdChild.forEach(thirdChildElem => {
                    thirdChildElem.isSelected = true;
                    formArray1.controls.forEach(thirdelements => {
                      if (thirdelements.value.id == cocElem.id) {
                        thirdelements.patchValue({
                          isSelected: true,
                        });
                      }
                    });
                  });
                });
              });
              return;
            } else {
              ctrl.patchValue({
                isSelected: true,
              });
              return;
            }
          } else {
            //2ND TO 3RD CHILD
            var objSecChildToThirdChild = this.allItems.find(x => x.id == event.target.value);
            if (objSecChildToThirdChild != null) {
              var lstFirstCoc = objSecChildToThirdChild.children.filter(x => x.parentId == objSecChildToThirdChild.id);
              lstFirstCoc.forEach((echild) => {
                echild.isSelected = true;
                formArray1.controls.forEach(element => {
                  if (element.value.id == echild.id) {
                    element.patchValue({
                      isSelected: true,
                    });
                  }
                });
                //2ND to 3rd CHILD
                var lst2ndChildTo3rdChild = echild.children.filter(c => c.parentId == echild.id);
                lst2ndChildTo3rdChild.forEach(cocElem => {
                  cocElem.isSelected = true;
                  formArray1.controls.forEach(elements => {
                    if (elements.value.id == cocElem.id) {
                      elements.patchValue({
                        isSelected: true,
                      });
                    }
                  });
                });
              });
            }
            ctrl.patchValue({
              isSelected: true,
            });
            return;
          }
        }
      });

    } else {
      formArray1.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value.id == event.target.value) {
          // Remove the unselected element from the arrayForm
          //formArray.removeAt(i);
          var singleItem = this.items.find(x => x.id == event.target.value);
          if (singleItem != null) {
            if (singleItem.parentId == 0) {
              ctrl.patchValue({
                isSelected: false,
              });

              //1ST CHILD
              var lstAllChild = singleItem.children.filter(x => x.parentId == singleItem.id);
              lstAllChild.forEach((echild) => {
                echild.isSelected = false;
                formArray1.controls.forEach(element => {
                  if (element.value.id == echild.id) {
                    element.patchValue({
                      isSelected: false,
                    });
                  }
                });

                //2ND CHILD
                var lstChildofChild = echild.children.filter(c => c.parentId == echild.id);
                lstChildofChild.forEach(cocElem => {
                  cocElem.isSelected = false;
                  formArray1.controls.forEach(elements => {
                    if (elements.value.id == cocElem.id) {
                      elements.patchValue({
                        isSelected: false,
                      });
                    }
                  });
                  //3RD CHILD
                  var lst3rdChild = cocElem.children.filter(c => c.parentId == cocElem.id);
                  lst3rdChild.forEach(thirdChildElem => {
                    thirdChildElem.isSelected = false;
                    formArray1.controls.forEach(thirdelements => {
                      if (thirdelements.value.id == cocElem.id) {
                        thirdelements.patchValue({
                          isSelected: false,
                        });
                      }
                    });
                  });
                });
              });
              return;
            } else {
              ctrl.patchValue({
                isSelected: false,
              });
              return;
            }
          } else {
            //2ND TO 3RD CHILD
            var objSecChildToThirdChild = this.allItems.find(x => x.id == event.target.value);
            if (objSecChildToThirdChild != null) {
              var lstFirstCoc = objSecChildToThirdChild.children.filter(x => x.parentId == objSecChildToThirdChild.id);
              lstFirstCoc.forEach((echild) => {
                echild.isSelected = false;
                formArray1.controls.forEach(element => {
                  if (element.value.id == echild.id) {
                    element.patchValue({
                      isSelected: false,
                    });
                  }
                });
                //2ND to 3rd CHILD
                var lst2ndChildTo3rdChild = echild.children.filter(c => c.parentId == echild.id);
                lst2ndChildTo3rdChild.forEach(cocElem => {
                  cocElem.isSelected = false;
                  formArray1.controls.forEach(elements => {
                    if (elements.value.id == cocElem.id) {
                      elements.patchValue({
                        isSelected: false,
                      });
                    }
                  });
                });
              });
            }
            ctrl.patchValue({
              isSelected: false,
            });
            return;
          }
        }
      });
    }
  }

  onActionCheckChange1(event) {
    console.log(event.target.value);
    const formArray1: FormArray = this.myForm.get("actionChoices") as FormArray;

    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      //formArray.push(new FormControl(event.target.value));
      let i: number = 0;

      formArray1.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value.actionSetupId == event.target.value) {
          // Remove the unselected element from the arrayForm
          //formArray.removeAt(i);
          ctrl.patchValue({
            isSelected: true,
          });
          return;
        }

        i++;
      });
    } else {
      /* unselected */
      // find the unselected element
      let i: number = 0;

      formArray1.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value.actionSetupId == event.target.value) {
          // Remove the unselected element from the arrayForm
          //formArray.removeAt(i);
          ctrl.patchValue({
            isSelected: false,
          });
          return;
        }

        i++;
      });
    }
  }

  selectedNodes: TreeNode[] = [];
  unselectedNodes: TreeNode[] = [];

  onNodeSelect(event: any) {
    console.log('Selected Node:', event.node);
    this.selectedNodes.push(event.node);
    // If you want to remove it from the unselectedNodes array if it was there before
    this.unselectedNodes = this.unselectedNodes.filter(node => node.label !== event.node.label);
  }

  onNodeUnselect(event: any) {
    console.log('Unselected Node:', event.node);
    this.unselectedNodes.push(event.node);
    // If you want to remove it from the selectedNodes array if it was there before
    this.selectedNodes = this.selectedNodes.filter(node => node.label !== event.node.label);
  }

  GetCheckBoxvalue() {
    this.menuService.MenuPermissionByUserId(this.userId, this.myForm.value.myChoices, this.myForm.value.actionChoices).subscribe(
      (res) => {
        this.toaster.success("Permission Saved Successfully!", "Menu Permission");
      },
      (error) => {
        this.toaster.warning("Failed to Save", "Menu Permission");
      }
    );
    console.log(this.myForm.value);
  }

  BlankNewMenuPermission(obj: any): FormGroup {
    return this.fb.group({
      id: [obj.id],
      userId: [obj.userId],
      isSelected: [obj.isSelected],
    });
  }

  BlankNewMenuActionPermission(obj: any): FormGroup {
    return this.fb.group({
      id: [obj.id],
      userId: [obj.userId],
      isSelected: [obj.isSelected],
      menuId: [obj.menuId],
      actionSetupId: [obj.actionSetupId],
    });
  }

  MenuPermission(): FormArray {
    return this.myForm.get("myChoices") as FormArray;
  }
  ActionPermission(): FormArray {
    return this.myForm.get("actionChoices") as FormArray;
  }

  // GetCheckBoxvalue() {
  //   this.settingService
  //     .CreateMenuPermission(this.customForm.value, this.myForm.value.myChoices)
  //     .subscribe(
  //       (res) => {
  //         if (res) {
  //           this.toastr.success("Updated Successfully", "Menu Permission");
  //           //this.onSearch();
  //           //this.selectedFiles = null;
  //         }
  //       },
  //       (error) => {
  //         //console.log(error);
  //         this.toastr.warning("Failed to save");
  //       }
  //     );
  //   //console.log(this.myForm.value);
  // }
}

