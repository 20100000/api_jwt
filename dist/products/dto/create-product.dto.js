"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateProductDto {
    title;
    price;
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Teclado Mecânico RGB',
        description: 'Nome ou título do produto'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O título do produto é obrigatório.' }),
    (0, class_validator_1.MinLength)(3, { message: 'O título deve ter no mínimo 3 caracteres.' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 299.90,
        description: 'Preço unitário do produto com até 2 casas decimais'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O preço é obrigatório.' }),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }, { message: 'O preço deve ser um número válido.' }),
    (0, class_validator_1.IsPositive)({ message: 'O preço deve ser maior que zero.' }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
//# sourceMappingURL=create-product.dto.js.map