export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      "[fe] Avaliacao": {
        Row: {
          "Acompanhamento de Validade": string | null
          Ano: string | null
          Assiduidade: string | null
          Avaliador: string | null
          "Boa Comunicação": string | null
          "Bom Relacionamento com os Gestores da Loja": string | null
          Colaborador: string | null
          created_at: string
          Dia: string | null
          "Execução (Agilidade e Objetividade)": string | null
          "Exposição de Produtos em Estoque": string | null
          id: number
          "Layout Padronizado": string | null
          "Limpeza e Organização": string | null
          Mês: string | null
          Pontuacao: string | null
          "Precificação de Produtos": string | null
          "Realização de Pedidos": string | null
        }
        Insert: {
          "Acompanhamento de Validade"?: string | null
          Ano?: string | null
          Assiduidade?: string | null
          Avaliador?: string | null
          "Boa Comunicação"?: string | null
          "Bom Relacionamento com os Gestores da Loja"?: string | null
          Colaborador?: string | null
          created_at?: string
          Dia?: string | null
          "Execução (Agilidade e Objetividade)"?: string | null
          "Exposição de Produtos em Estoque"?: string | null
          id?: number
          "Layout Padronizado"?: string | null
          "Limpeza e Organização"?: string | null
          Mês?: string | null
          Pontuacao?: string | null
          "Precificação de Produtos"?: string | null
          "Realização de Pedidos"?: string | null
        }
        Update: {
          "Acompanhamento de Validade"?: string | null
          Ano?: string | null
          Assiduidade?: string | null
          Avaliador?: string | null
          "Boa Comunicação"?: string | null
          "Bom Relacionamento com os Gestores da Loja"?: string | null
          Colaborador?: string | null
          created_at?: string
          Dia?: string | null
          "Execução (Agilidade e Objetividade)"?: string | null
          "Exposição de Produtos em Estoque"?: string | null
          id?: number
          "Layout Padronizado"?: string | null
          "Limpeza e Organização"?: string | null
          Mês?: string | null
          Pontuacao?: string | null
          "Precificação de Produtos"?: string | null
          "Realização de Pedidos"?: string | null
        }
        Relationships: []
      }
      "[fe] Avaliadores": {
        Row: {
          created_at: string
          id: number
          Nome: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          Nome?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          Nome?: string | null
        }
        Relationships: []
      }
      codigos: {
        Row: {
          codigo: string
          created_at: string | null
          id: number
          industria: string
          produto: string
        }
        Insert: {
          codigo: string
          created_at?: string | null
          id?: number
          industria: string
          produto: string
        }
        Update: {
          codigo?: string
          created_at?: string | null
          id?: number
          industria?: string
          produto?: string
        }
        Relationships: []
      }
      industrias: {
        Row: {
          id_ind: number
          nome_industria: string | null
        }
        Insert: {
          id_ind?: number
          nome_industria?: string | null
        }
        Update: {
          id_ind?: number
          nome_industria?: string | null
        }
        Relationships: []
      }
      teste: {
        Row: {
          created_at: string
          id: number
          teste: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          teste?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          teste?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
