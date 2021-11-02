<template>
  <div class="admin p-4">
    <b-row>
      <b-modal
        varian="dark"
        class="backdropblur"
        size="lg"
        id="show-plan-detail"
        title=""
      >
        <b-container align-v="center" class="container">
          <div class="mt-5">
            <b-card-group deck class="mb-3">
              <!-- card 1 -->
              <b-card
                border-variant="default"
                :header="plan.name"
                header-bg-variant="secondary"
                header-text-variant="white"
                align="center"
                :title="showPrice"
                tag="article"
                style="max-width: auto"
                class="mb-5 mt-2"
              >
                <br />

                <b-list-group flush>
                  <b-list-group-item></b-list-group-item>
                  <b-list-group-item>
                    <b-icon-people class="h5 mr-2 mb-0 mt-0"></b-icon-people
                    >Cantidad de usuarios : {{ plan.max_users }}
                  </b-list-group-item>
                  <b-list-group-item>
                    <b-icon-people class="h5 mr-2 mb-0 mt-0"></b-icon-people
                    >Cantidad de participantes : {{ plan.max_participants }}
                  </b-list-group-item>
                  <b-list-group-item>
                    <b-icon-film class="h5 mr-2 mb-0 mt-0"></b-icon-film
                    >Cantidad de salas : {{ plan.max_rooms }}
                  </b-list-group-item>
                  <b-list-group-item>
                    <b-icon-film class="h5 mr-2 mb-0 mt-0"></b-icon-film
                    >Cantidad de escenas : {{ plan.max_scenes }}
                  </b-list-group-item>
                  <b-list-group-item>
                    <b-icon-badge-ad class="h5 mr-2 mb-0 mt-0"></b-icon-badge-ad
                    >Cantidad de gsc : {{ plan.max_gsc }}
                  </b-list-group-item>
                  <b-list-group-item>
                    <b-icon-badge4k class="h5 mr-2 mb-0 mt-0"></b-icon-badge4k
                    >Cantidad de multimedia : {{ plan.max_multimedia }}
                  </b-list-group-item>
                  <b-list-group-item>
                    <b-icon-card-checklist
                      class="h5 mr-2 mb-0 mt-0"
                    ></b-icon-card-checklist
                    >Cantidad de encuestas : {{ plan.max_polls }}
                  </b-list-group-item>
                  <b-list-group-item></b-list-group-item>
                </b-list-group>
                <br />

                <br />
              </b-card>
            </b-card-group>
          </div>
          <!-- card 1 ends here-->
        </b-container>

        <div slot="modal-footer">
          <b-btn
            class="float-right"
            variant="danger"
            @click="$bvModal.hide('show-plan-detail')"
          >
            Cerrar
          </b-btn>
        </div>
      </b-modal>
    </b-row>
  </div>
</template>


<script>
export default {
  props: ["plan"],
  data() {
    return {
      activesOption: [
        { text: "Activo", value: true },
        { text: "Inactivo", value: false },
      ],
    };
  },
  computed: {
    showPrice() {
      const newPrice =
        this.plan.promo > 0
          ? this.plan.price - this.plan.price * (this.plan.promo / 100)
          : this.plan.price;

      return `$${newPrice}/Month`;
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

#show-plan-detail {
  backdrop-filter: blur(5px);

  .modal-content {
    background-color: #141414 !important;
    color: #ddd;
    border: 1px solid #333;
    color: #000;

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