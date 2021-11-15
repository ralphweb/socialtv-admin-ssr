<template>
  <div class="admin p-4">
    <b-modal
      class="backdropblur"
      size="xl"
      id="add-users-modal"
      title="Añadir o quitar usuarios"
    >
      <b-row v-if="data != null">
        <!-- List of usuario out organization-->
        <b-col cols="12">
          <b-form-group
            id="list-of-user"
            label="Usuarios fuera de la organización"
            label-for="list-of-user-1"
          >
            <b-input-group prepend="Usuarios">
              <b-form-select
                id="active-1"
                v-model="userOutOrganization"
                :options="listUserOutOrganization"
                required
              ></b-form-select>
              <b-button
                class="ml-4"
                variant="warning"
                @click="addUser(userOutOrganization)"
                :disabled="userOutOrganization == null"
                >Añadir usuario</b-button
              >
            </b-input-group>
          </b-form-group>
        </b-col>
        <!-- List of usuario inside organization-->
        <b-col cols="12">
          <b-form-group
            id="list-of-user"
            label="Usuarios que pertenecen a la organización"
            label-for="list-of-user-1"
          >
            <b-input-group prepend="usuarios">
              <b-form-select
                id="active-1"
                v-model="userInsideOrgnization"
                :options="listUserInsideOrganization"
                required
              ></b-form-select>
              <b-button
                class="ml-4"
                variant="warning"
                @click="deleteUser(userInsideOrgnization)"
                :disabled="userInsideOrgnization == null"
                >Eliminar usuario
              </b-button>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <div slot="modal-footer">
        <b-btn
          class="float-right"
          variant="danger"
          @click="$bvModal.hide('add-users-modal')"
        >
          Cerrar
        </b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      listUserInsideOrganization: [],
      listUserOutOrganization: [],

      userInsideOrgnization: null, //for delete
      userOutOrganization: null, //for add
    };
  },
  methods: {
    //add user to organization
    async addUser(user) {
      const object = {
        user_id: user._id,
        organization_id: this.data,
      };

      this.$axios
        .post("/api/user/addUserToOrganization", object)
        .then(() => {
          this.userOutOrganization = null;
          this.$swal.fire(
            "Creación exitosa",
            "Usuario añadido correctamente a la organización",
            "success"
          );
          //when user add correctly, delete this user inside array userOutOrganization and add in userInsideOrgnization
          this.listUserOutOrganization = this.listUserOutOrganization.filter(
            (userList) => {
              if (userList.value._id === user._id) {
                this.listUserInsideOrganization.push(userList);
              } else {
                return userList;
              }
            }
          );
        })
        .catch(() => {
          this.$swal.fire(
            "Ups..",
            "Ocurrio un error.. favor contactar al administrador",
            "error"
          );
        });
    },
    //delete user from organization
    async deleteUser(user) {
      const object = {
        user_id: user._id,
        organization_id: this.data,
      };

      this.$axios
        .post("/api/user/deleteUserToOrganization", object)
        .then(() => {
          this.userInsideOrgnization = null;
          this.$swal.fire(
            "Creación exitosa",
            "Usuario eliminado correctamente de la organización",
            "success"
          );
          //when user add correctly, delete this user inside array userOutOrganization and add in userInsideOrgnization
          this.listUserInsideOrganization =
            this.listUserInsideOrganization.filter((userList) => {
              if (userList.value._id === user._id) {
                this.listUserOutOrganization.push(userList);
              } else {
                return userList;
              }
            });
        })
        .catch(() => {
          this.$swal.fire(
            "Ups..",
            "Ocurrio un error.. favor contactar al administrador",
            "error"
          );
        });
    },
    //this function if for close modal
    closeModal() {
      this.data = null;
      this.$bvModal.hide("add-users-modal");
    },
    //initComponent is for call all necesary data
    initComponent(organization) {
      this.clearData();
      this.$axios
        .post("/api/user/getUsers", { user_id: this.$store.state.auth.id })
        .then((result) => {
          if (result.data.length > 0) {
            result.data.forEach((usuarios) => {
              if (usuarios.organization.indexOf(organization) !== -1) {
                this.listUserInsideOrganization.push({
                  text: `Usuario: ${usuarios.name} ${usuarios.lastName}`,
                  value: usuarios,
                });
              } else {
                this.listUserOutOrganization.push({
                  text: `Usuario: ${usuarios.name}`,
                  value: usuarios,
                });
              }
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    //this function is for clear data when call component again
    clearData() {
      this.listUserInsideOrganization = [];
      this.listUserOutOrganization = [];
      this.userInsideOrgnization = null;
      this.userOutOrganization = null;
    },
  },
  watch: {
    //i watching the new value from props data
    async data(valor) {
      this.initComponent(valor);
    },
  },
  mounted() {
    this.initComponent(this.data);
  },
};
</script>


<style lang="scss">
@import "@/imports/variables";

#add-users-modal {
  backdrop-filter: blur(5px);

  .modal-content {
    background-color: #141414 !important;
    color: #ddd;
    border: 1px solid #333;

    .modal-header,
    .modal-footer {
      border-bottom: 1px solid #333;
      border-top: 1px solid #333;
    }

    strong {
      color: $maincolor;
    }

    input,
    select {
      background-color: #000 !important;
      border: none;
      color: white;
    }
  }

  .pass {
    background-color: #2e3338;
    padding: 15px;
    border-radius: 15px;
  }
}
</style>