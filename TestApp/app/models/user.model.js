module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        ruc: String,
        estado: String,
        razon_social: String,
        direccion: String,
        ubigeo: String,
        departamento: String,
        provincia: String,
        distrito: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const User = mongoose.model("user", schema);
    return User;
  };