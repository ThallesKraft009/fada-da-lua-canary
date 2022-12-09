const { Schema, model } = require("mongoose");

const userset = new Schema({
  userID: { type: String },
  userNAME: { type: String },

  uid: { type: String, default: null },
  estrelas: { type: Number, default: 0 },
  
  figurinhas: {
    text: { type: String },
    total: { type: Number, default: 0 },
    comum: { type: Number, default: 0 },
    incomum: { type: Number, default: 0 },
    raro: { type: Number, default: 0 },
    epico: { type: Number, default: 0 },
    lendario: { type: Number, default: 0 },
  },

  rpg: {
    mundo: { type: String },
    statusMundo: { type: Boolean, default: false },
    d: { type: String, default: "Miras" },
    money: { type: Number, default: 0 },

   status: {
     vida: { type: Number, default: 100},
     fome: { type: Number, default: 100},
     xp: { type: Number, default: 0},
     level: { type: Number, default: 0}
   },
    
    blocos: {
      madeira: { type: Number, default: 0 },
      pedra: { type: Number, default: 0}
    },

    mineriosBloco: {
      cobre: { type: Number, default: 0},
      ferro: { type: Number, default: 0},
      titanio: { type: Number, default: 0}
    },

    minerios: {
      carvao: { type: Number, default: 0},
      cobre: { type: Number, default: 0},
      ferro: { type: Number, default: 0},
      titanio: { type: Number, default: 0}
    },
    
    item: {
      graveto: { type: Number, default: 0},
      tocha: { type: Number, default: 0},
      fornalha: { type: String, default: null },
      comida: { type: Number, default: 0 }
    },

    config: {
      madeiraTotal: { type: Number, default: 2 },
      madeiraMoney: { type: Number, default: 100 }
    },

      picaretas: {
        pedra: { type: Number, default: 0 },
        cobre: { type: Number, default: 0 },
        ferro: { type: Number, default: 0 },
        titanio: { type: Number, default: 0 }
      },

    explorar: {
      ilhaflutuanteA: { type: Number, default: 0 },
      deserto: { type: Boolean, default: false },
      
    },
  },

  conquistas: {
    rpg: {
      madeira: { type: Boolean, default: false },
      picareta: { type: Boolean, default: false }
    }
  },

  tempo: {
    daily: { type: Number, default: 0 }
  },

  
  
});


module.exports = model("Mw-Usuarios", userset); 
