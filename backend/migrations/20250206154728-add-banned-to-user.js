module.exports = {

      // Ajoute la colonne `role` à la table `Users`
  up: async (queryInterface, Sequelize) => {

    // Ajoute la colonne `banned` à la table `Users`
    await queryInterface.addColumn('users', 'banned', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,  // Par défaut, l'utilisateur n'est pas banni
      allowNull: false,     // Cette colonne ne peut pas être nulle
    });

  },

  down: async (queryInterface, Sequelize) => {
    // En cas de rollback, on supprime la colonne `banned`
    await queryInterface.removeColumn('users', 'banned');
  }
};
