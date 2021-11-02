<template>
  <div class="admin p-4">
    <h2 class="text-light">Organizaciones</h2>
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
    </b-row>

    <b-row>
      <b-col cols="12">
        <h2 class="text-light">Tus organizaciones</h2>
      </b-col>
      <b-col lg="4" sm="12" v-for="org in organizations" :key="org._id">
        <b-card
          class="text-light mb-2"
          bg-variant="dark"
          :header="org.name"
          img-top
          tag="article"
          style="max-width: 20rem"
        >
          <b-card-text> </b-card-text>
          <b-button-group size="sm">
            <b-button
              variant="warning"
              v-if="org.owner_id === user_id"
              @click="showAddUser(org)"
            >
              <b-icon icon="plus"></b-icon>Añadir Usuarios</b-button
            >
            <b-button class="ml-2" variant="info" @click="showOrganization">
              <b-icon icon="door-open"></b-icon>Ingresar organización</b-button
            >
          </b-button-group>
        </b-card>
      </b-col>
    </b-row>

    <!--Call Componentes--->
    <createOrganization />
    <addUsers v-if="openAddUserComponent" :data="organizationSelected" />
  </div>
</template>

<script>
import createOrganization from "./../../components/organizations/CreateOrganization.vue";
import addUsers from "./../../components/organizations/AddUserToOrganization.vue";
export default {
  middleware: "authenticated",
  components: {
    createOrganization,
    addUsers,
  },
  data() {
    return {
      organizations: null,
      qty_organizations: null,
      user_id: this.$store.state.auth.id,

      openAddUserComponent: false,
      organizationSelected: false,
    };
  },
  methods: {
    showOrganization() {
      this.$router.push("/organizacion/organization");
    },
    showAddUser(organization) {
      this.$bvModal.show("add-users-modal");
      this.openAddUserComponent = true;
      this.organizationSelected = organization._id;
    },
  },

  async mounted() {
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
        })
        .catch((e) => {
          console.error(e);
        });
    } catch (error) {
      console.erro(error);
    }
  },
};
</script>


<style lang="scss">
@import "@/imports/variables";
</style>