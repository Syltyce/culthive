module.exports = {

      // Ajoute la colonne `role` à la table `Users`
  up: async (queryInterface) => {

    // Ajoute la colonne `banned` à la table `Users`
    await queryInterface.addColumn('users', 'banned', {
      type: queryInterface.Sequelize.BOOLEAN,
      defaultValue: false,  // Par défaut, l'utilisateur n'est pas banni
      allowNull: false,     // Cette colonne ne peut pas être nulle
    });

  },

  down: async (queryInterface) => {
    // En cas de rollback, on supprime la colonne `banned`
    await queryInterface.removeColumn('users', 'banned');
  }
};
