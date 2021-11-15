<template>
  <div class="admin p-4">
    <b-modal
      class="backdropblur"
      size="xl"
      id="organization-edit"
      title="Creando una organización"
    >
      <b-row v-if="organization != null">
        <!-- Name of the organization-->
        <b-col cols="12">
          <b-form-group
            id="name-organization"
            label="Nombre"
            label-for="name-organization"
          >
            <b-form-input
              id="name-organization"
              name="name-organization"
              v-model="organization.name"
              placeholder="Nombre de la organización Ejemplo: Social Hound"
              v-validate="{ required: true, min: 3 }"
              :state="validateState('name-organization')"
              aria-describedby="input-1-live-feedback"
              data-vv-as="Nombre de la organización"
            >
            </b-form-input>

            <b-form-invalid-feedback id="input-1-live-feedback">{{
              veeErrors.first("name-organization")
            }}</b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <!-- Active or not-->
        <b-col cols="12">
          <b-form-group
            id="example-input-2"
            label="¿Organización activa?"
            label-for="example-input-2"
          >
            <b-form-select
              id="example-input-2"
              name="example-input-2"
              v-model="organization.active"
              v-validate="{ required: true }"
              :options="activesOption"
              :state="validateState('example-input-2')"
              aria-describedby="input-2-live-feedback"
              data-vv-as="Activo"
            ></b-form-select>

            <b-form-invalid-feedback id="input-2-live-feedback">{{
              veeErrors.first("example-input-2")
            }}</b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <div slot="modal-footer">
        <b-btn
          class="float-right"
          variant="danger"
          @click="$bvModal.hide('organization-edit')"
        >
          Cerrar
        </b-btn>

        <b-button
          type="button"
          @click="editOrganization(organization)"
          variant="success"
          class="float-right mr-3"
          >Editar</b-button
        >
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: ["organization"],

  data() {
    return {
      activesOption: [
        { text: "Activo", value: true },
        { text: "Inactivo", value: false },
      ],
    };
  },
  methods: {
    //the next function is for edit
    async editOrganization(organization) {
      console.log(organization);
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          const response = await this.$axios.put(
            "/api/organization/" + organization._id,
            organization
          );

          if (response.status === 200) {
            this.$swal.fire(
              "Excelente!",
              "Organización editada de manera correcta en el sistema",
              "success"
            );

            this.$bvModal.hide("organization-edit");
          } else {
            this.$swal.fire(
              "Ups..",
              "Ocurrio un error.. favor contactar al administrador",
              "error"
            );
          }
        }
      });
    },
    //this function is for validate form
    validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref);
      }
      return null;
    },
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

#organization-edit {
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