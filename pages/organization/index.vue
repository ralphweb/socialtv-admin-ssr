<template>
  <div class="admin p-4">
    <h2 v-bind:class="{ 'text-light': true }">Organizaciones</h2>
    <!--Alertas -->
    <b-row v-if="qty_organizations === null">
      <b-col cols="4">
        <b-alert show variant="primary">Buscando organizaciones...</b-alert>
      </b-col>
    </b-row>
    <b-row v-if="qty_organizations !== null">
      <b-col lg="6" v-bind:class="{ 'my-3': true }">
        <b-button
          class="btn-warning float-left"
          size="lg"
          v-b-modal.organization-create
          >Crear organización</b-button
        >
      </b-col>
      <b-col lg="6" v-bind:class="{ 'my-3': true }">
        <b-form-group
          label=""
          label-for="filter-input"
          label-cols-sm="12"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Filtrar por organización"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >Limpiar</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12" v-bind:class="{ 'my-3': true }">
        <b-table
          id="list-plan-table"
          striped
          dark
          hover
          :filter="filter"
          :items="organizations"
          :fields="fields"
          :per-page="perPage"
          :current-page="currentPage"
          @filtered="onFiltered"
        >
          >
          <!--Active o inactive plan-->
          <template #cell(active)="row">
            <toggle-button
              v-model="row.item.active"
              color="#FF007A"
              :sync="true"
              :labels="{ checked: 'Activo', unchecked: 'Inactivo' }"
              :width="80"
              @change="saveToggle(row.item._id, 'active', row.item.active)"
            />
          </template>

          <!--Active o inactive plan-->
          <template #cell(actions)="row">
            <b-button-group size="sm">
              <b-button
                variant="warning"
                v-if="row.item.owner_id === user_id"
                @click="edit(row.item)"
                class="mr-2"
              >
                <b-icon icon="pencil"></b-icon>Editar</b-button
              >
              <b-button
                variant="warning"
                v-if="row.item.owner_id === user_id"
                @click="showAddUser(row.item)"
              >
                <b-icon icon="plus"></b-icon>Añadir Usuarios</b-button
              >
              <b-button class="ml-2" variant="info" @click="showOrganization">
                <b-icon icon="door-open"></b-icon>Ingresar
                organización</b-button
              >
            </b-button-group>
          </template>
        </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="center"
          v-bind:class="{ 'my-0': true }"
        ></b-pagination>
      </b-col>
    </b-row>

    <b-row>
      <!--Call Componentes--->

      <createOrganization />
      <addUsers :data="organizationSelected" />
      <editOrganization :organization="organizationForEdit" />
    </b-row>
  </div>
</template>

<script>
import createOrganization from "./../../components/organizations/CreateOrganization.vue";
import addUsers from "./../../components/organizations/AddUserToOrganization.vue";
import editOrganization from "./../../components/organizations/EditOrganization.vue";
export default {
  middleware: "authenticated",
  components: {
    createOrganization,
    addUsers,
    editOrganization,
  },
  data() {
    return {
      organizations: null,
      qty_organizations: null,
      user_id: this.$store.state.auth.id,

      //for edit
      organizationForEdit: null,
      // for add user
      openAddUserComponent: false,
      organizationSelected: false,

      //table
      filter: null,
      perPage: 5,
      currentPage: 1,
      totalRows: 1,
      fields: [
        { key: "name", label: "Nombre de la organización", sortable: true },
        { key: "active", label: "Activo", sortable: true },

        { key: "actions", label: "Acciones", sortable: false },
      ],
    };
  },
  methods: {
    showOrganization() {
      this.$router.push("/organizacion/organization");
    },
    showAddUser(organization) {
      this.organizationSelected = organization._id;
      this.$bvModal.show("add-users-modal");
    },
    edit(organization) {
      this.organizationForEdit = organization;
      this.$bvModal.show("organization-edit");
    },
    async callOrganization() {
      try {
        this.$axios
          .post("/api/user/myOrganizations", {
            user_id: this.$store.state.auth.id,
          })
          .then((result) => {
            this.organizations = result.data[0].organization.map((org) => {
              return org;
            });

            this.qty_organizations = this.organizations.length;
            this.totalRows = this.organizations.length;
          })
          .catch((e) => {
            console.error(e);
          });
      } catch (error) {
        console.erro(error);
      }
    },
    async saveToggle(id, field, value) {
      let newValues = {};
      newValues[field] = value;
      const response = await this.$axios.put(
        "/api/organization/" + id,
        newValues
      );
      if (response.status === 200) {
        this.$swal.fire(
          "Excelente!",
          "Organización actualizado de manera correcta",
          "success"
        );
      } else {
        this.$swal.fire(
          "Ups!",
          "No se pudo actualizar la organización... contacta al administrador",
          "info"
        );
      }
    },

    onFiltered(filteredItems) {
      console.log(filteredItems);
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },

  async mounted() {
    this.callOrganization();
  },
};
</script>


<style lang="scss">
@import "@/imports/variables";

.table > :not(caption) > * > * {
  vertical-align: middle;
  position: relative;
}

.pagination {
  .page-item {
    .page-link {
      background-color: #212529;
      border-color: #2e3338;
      color: white;
    }

    &.active {
      .page-link {
        background-color: #2e3338;
        border-color: #2e3338;
        color: $maincolor;
      }
    }
  }
}
.scroll-off {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  max-height: 100vh;
  overflow: hidden;
  padding-bottom: 1px;
}
</style>