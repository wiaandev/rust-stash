export class IngredientModel {
    public inventoryId: string;
    public requiredAmount: number;
    public canCraft: boolean;
  
    constructor(
      inventoryId: string,
      requiredAmount: number,
      canCraft: boolean
    ) {
      this.inventoryId= inventoryId;
      this.requiredAmount = requiredAmount;
      this.canCraft = canCraft;
    }
  }
  