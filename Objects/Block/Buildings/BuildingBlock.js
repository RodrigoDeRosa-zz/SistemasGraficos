class BuildingBlock extends Container3D{
    /**Manzana con 16 edificios.
      * @param {shader} ShaderProgram
    */
    constructor(shader, noBuildings, number){
        super();

        this.setShaderProgram(shader);
        if (!noBuildings) this.generateBlock(shader, number);
        this.addSidewalk(shader);
    }
    /**Genera la manzana creando cada uno de los 4 sets.
      * @param {shader} ShaderProgram
    */
    generateBlock(shader, number){
        var color = new Orange(2, 8);

        var set1 = new BuildingSet(shader, number);
        set1.translate(0.375, 0, 0.25);
        set1.rotate(Math.PI/2, 0, 1, 0);

        var set2 = new BuildingSet(shader, number);
        set2.translate(-0.375, 0, 0.5);
        set2.rotate(Math.PI/2, 0, 1, 0);

        var set3 = new BuildingSet(shader, number);
        set3.translate(-0.25, 0, 0.375);

        var set4 = new BuildingSet(shader, number);
        set4.translate(-0.5, 0, -0.375);

        this.addChild(set1);
        this.addChild(set2);
        this.addChild(set3);
        this.addChild(set4);
    }
    /**Crea la vereda de la manzana.
      * @param {shader} ShaderProgram
    */
    addSidewalk(shader){
        var sidewalk = new Sidewalk(shader, null, true);
        sidewalk.setShaderProgram(shader);

        this.addChild(sidewalk);
    }
}
