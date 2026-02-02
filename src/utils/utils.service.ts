import { Injectable } from "@nestjs/common";

/**
 * Serviço de utilitários compartilhados.
 */
@Injectable()
export class UtilsService {
  /**
   * Formata data para padrão brasileiro.
   */
  formatDate(date: Date): string {
    return new Intl.DateTimeFormat("pt-BR").format(date);
  }

  /**
   * Remove acentos de texto.
   */
  removeAccents(text: string): string {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}
