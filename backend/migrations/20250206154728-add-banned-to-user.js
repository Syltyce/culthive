module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Ajoute la colonne `banned` à la table `Users`
    await queryInterface.addColumn('Users', 'banned', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,  // Par défaut, l'utilisateur n'est pas banni
      allowNull: false,     // Cette colonne ne peut pas être nulle
    });
  },

  down: async (queryInterface, Sequelize) => {
    // En cas de rollback, on supprime la colonne `banned`
    await queryInterface.removeColumn('Users', 'banned');
  }
};
