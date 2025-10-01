export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      ai_conversations: {
        Row: {
          created_at: string
          id: number
          is_counted: boolean
          system_promt: string
          tenant: string
          tenant_permission: number
          title: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          is_counted?: boolean
          system_promt: string
          tenant: string
          tenant_permission: number
          title?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          is_counted?: boolean
          system_promt?: string
          tenant?: string
          tenant_permission?: number
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_conversations_tenant_fkey"
            columns: ["tenant"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_conversations_tenant_permission_fkey"
            columns: ["tenant_permission"]
            isOneToOne: false
            referencedRelation: "tenant_permissions"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_conversations_per_tenant: {
        Row: {
          count: number
          created_at: string
          id: number
          tenant: string
        }
        Insert: {
          count: number
          created_at?: string
          id?: number
          tenant: string
        }
        Update: {
          count?: number
          created_at?: string
          id?: number
          tenant?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_conversations_per_tenant_tenant_fkey"
            columns: ["tenant"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_messages: {
        Row: {
          attachments: string[] | null
          content: string
          conversation: number
          created_at: string
          id: number
          role: string
          tenant: string
          tenant_permission: number
        }
        Insert: {
          attachments?: string[] | null
          content: string
          conversation: number
          created_at?: string
          id?: number
          role: string
          tenant: string
          tenant_permission: number
        }
        Update: {
          attachments?: string[] | null
          content?: string
          conversation?: number
          created_at?: string
          id?: number
          role?: string
          tenant?: string
          tenant_permission?: number
        }
        Relationships: [
          {
            foreignKeyName: "ai_messages_conversation_fkey"
            columns: ["conversation"]
            isOneToOne: false
            referencedRelation: "ai_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_messages_tenant_fkey"
            columns: ["tenant"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_messages_tenant_permission_fkey"
            columns: ["tenant_permission"]
            isOneToOne: false
            referencedRelation: "tenant_permissions"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_messages_per_tenant: {
        Row: {
          count: number
          created_at: string
          id: number
          tenant: string
        }
        Insert: {
          count: number
          created_at?: string
          id?: number
          tenant: string
        }
        Update: {
          count?: number
          created_at?: string
          id?: number
          tenant?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_messages_per_tenant_tenant_fkey"
            columns: ["tenant"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      businesses: {
        Row: {
          areas_needs_help: string[] | null
          business_goal_one_three_years: string | null
          business_goal_one_year: string | null
          city: string | null
          country: string | null
          created_at: string
          creation_date: string | null
          description: string | null
          email: string | null
          id: number
          industries: string[] | null
          name: string | null
          phone_number: string | null
          phone_prefix: string | null
          stage: string[] | null
          types: string[] | null
        }
        Insert: {
          areas_needs_help?: string[] | null
          business_goal_one_three_years?: string | null
          business_goal_one_year?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          creation_date?: string | null
          description?: string | null
          email?: string | null
          id?: number
          industries?: string[] | null
          name?: string | null
          phone_number?: string | null
          phone_prefix?: string | null
          stage?: string[] | null
          types?: string[] | null
        }
        Update: {
          areas_needs_help?: string[] | null
          business_goal_one_three_years?: string | null
          business_goal_one_year?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          creation_date?: string | null
          description?: string | null
          email?: string | null
          id?: number
          industries?: string[] | null
          name?: string | null
          phone_number?: string | null
          phone_prefix?: string | null
          stage?: string[] | null
          types?: string[] | null
        }
        Relationships: []
      }
      businesses_milestones: {
        Row: {
          author_email: string
          author_name: string | null
          business_name: string | null
          created_at: string
          created_by: number
          date: string | null
          description: string | null
          id: number
          tags: string[] | null
          tenant: string
          title: string
          user_business: number
        }
        Insert: {
          author_email: string
          author_name?: string | null
          business_name?: string | null
          created_at?: string
          created_by: number
          date?: string | null
          description?: string | null
          id?: number
          tags?: string[] | null
          tenant: string
          title: string
          user_business: number
        }
        Update: {
          author_email?: string
          author_name?: string | null
          business_name?: string | null
          created_at?: string
          created_by?: number
          date?: string | null
          description?: string | null
          id?: number
          tags?: string[] | null
          tenant?: string
          title?: string
          user_business?: number
        }
        Relationships: [
          {
            foreignKeyName: "businesses_milestones_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "businesses_milestones_tenant_fkey"
            columns: ["tenant"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "businesses_milestones_user_business_fkey"
            columns: ["user_business"]
            isOneToOne: false
            referencedRelation: "users_businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      checking_forms: {
        Row: {
          created_at: string
          frecuency_cron: string
          frecuency_on_days: number[]
          frecuency_type: string
          hour: number
          id: number
          intro: string
          is_active: boolean
          outro: string | null
          started_at: string
          tenant: string
          title: string
        }
        Insert: {
          created_at?: string
          frecuency_cron: string
          frecuency_on_days: number[]
          frecuency_type: string
          hour: number
          id?: number
          intro: string
          is_active: boolean
          outro?: string | null
          started_at: string
          tenant: string
          title: string
        }
        Update: {
          created_at?: string
          frecuency_cron?: string
          frecuency_on_days?: number[]
          frecuency_type?: string
          hour?: number
          id?: number
          intro?: string
          is_active?: boolean
          outro?: string | null
          started_at?: string
          tenant?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "checking_forms_tenant_fkey"
            columns: ["tenant"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      checking_forms_executions: {
        Row: {
          checking_form: number
          created_at: string
          id: number
          sent_admin_emails: number | null
          sent_entrepreneur_emails: number | null
          tenant: string
        }
        Insert: {
          checking_form: number
          created_at?: string
          id?: number
          sent_admin_emails?: number | null
          sent_entrepreneur_emails?: number | null
          tenant: string
        }
        Update: {
          checking_form?: number
          created_at?: string
          id?: number
          sent_admin_emails?: number | null
          sent_entrepreneur_emails?: number | null
          tenant?: string
        }
        Relationships: [
          {
            foreignKeyName: "checking_forms_executions_checking_form_fkey"
            columns: ["checking_form"]
            isOneToOne: false
            referencedRelation: "checking_forms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checking_forms_executions_tenant_fkey"
            columns: ["tenant"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      checking_questions: {
        Row: {
          checking_form: number
          created_at: string
          id: number
          question_order: number
          tenant: string
          title: string
          type: Database["public"]["Enums"]["question_type"]
        }
        Insert: {
          checking_form: number
          created_at?: string
          id?: number
          question_order: number
          tenant: string
          title: string
          type?: Database["public"]["Enums"]["question_type"]
        }
        Update: {
          checking_form?: number
          created_at?: string
          id?: number
          question_order?: number
          tenant?: string
          title?: string
          type?: Database["public"]["Enums"]["question_type"]
        }
        Relationships: [
          {
            foreignKeyName: "checking_questions_checking_form_fkey"
            columns: ["checking_form"]
            isOneToOne: false
            referencedRelation: "checking_forms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checking_questions_tenant_fkey"
            columns: ["tenant"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      checking_response: {
        Row: {
          answer: string
          checking_question: number
          checking_submission: number
          created_at: string
          id: number
          question: string
          tenant: string
          tenant_permission: number
        }
        Insert: {
          answer: string
          checking_question: number
          checking_submission: number
          created_at?: string
          id?: number
          question: string
          tenant: string
          tenant_permission: number
        }
        Update: {
          answer?: string
          checking_question?: number
          checking_submission?: number
          created_at?: string
          id?: number
          question?: string
          tenant?: string
          tenant_permission?: number
        }
        Relationships: [
          {
            foreignKeyName: "checking_response_checking_question_fkey"
            columns: ["checking_question"]
            isOneToOne: false
            referencedRelation: "checking_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checking_response_checking_submission_fkey"
            columns: ["checking_submission"]
            isOneToOne: false
            referencedRelation: "checking_submissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checking_response_tenant_fkey"
            columns: ["tenant"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checking_response_tenant_permission_fkey"
            columns: ["tenant_permission"]
            isOneToOne: false
            referencedRelation: "tenant_permissions"
            referencedColumns: ["id"]
          },
        ]
      }
      checking_submissions: {
        Row: {
          checking_form: number
          checking_form_execution: number
          created_at: string
          id: number
          tenant: string
          tenant_permission: number
          user_name: string | null
          user_picture: string | null
        }
        Insert: {
          checking_form: number
          checking_form_execution: number
          created_at?: string
          id?: number
          tenant: string
          tenant_permission: number
          user_name?: string | null
          user_picture?: string | null
        }
        Update: {
          checking_form?: number
          checking_form_execution?: number
          created_at?: string
          id?: number
          tenant?: string
          tenant_permission?: number
          user_name?: string | null
          user_picture?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "checking_submissions_checking_form_execution_fkey"
            columns: ["checking_form_execution"]
            isOneToOne: false
            referencedRelation: "checking_forms_executions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checking_submissions_checking_form_fkey"
            columns: ["checking_form"]
            isOneToOne: false
            referencedRelation: "checking_forms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checking_submissions_tenant_fkey"
            columns: ["tenant"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checking_submissions_tenant_permission_fkey"
            columns: ["tenant_permission"]
            isOneToOne: false
            referencedRelation: "tenant_permissions"
            referencedColumns: ["id"]
          },
        ]
      }
      data_exports: {
        Row: {
          completed_at: string | null
          export_type: Database["public"]["Enums"]["export_type"]
          file_url: string | null
          id: number
          requested_at: string
          requested_by_email: string
          requested_by_name: string
          status: Database["public"]["Enums"]["export_status"]
          tenant: string
        }
        Insert: {
          completed_at?: string | null
          export_type: Database["public"]["Enums"]["export_type"]
          file_url?: string | null
          id?: number
          requested_at?: string
          requested_by_email: string
          requested_by_name: string
          status?: Database["public"]["Enums"]["export_status"]
          tenant: string
        }
        Update: {
          completed_at?: string | null
          export_type?: Database["public"]["Enums"]["export_type"]
          file_url?: string | null
          id?: number
          requested_at?: string
          requested_by_email?: string
          requested_by_name?: string
          status?: Database["public"]["Enums"]["export_status"]
          tenant?: string
        }
        Relationships: [
          {
            foreignKeyName: "data_exports_tenant_fkey"
            columns: ["tenant"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      diagnostic_module_responses: {
        Row: {
          business_id: number | null
          createad_at: string | null
          id: number
          module_id: string | null
          score: number | null
          subject: string
          type: string
          user_id: number
          version: string | null
        }
        Insert: {
          business_id?: number | null
          createad_at?: string | null
          id?: number
          module_id?: string | null
          score?: number | null
          subject: string
          type: string
          user_id: number
          version?: string | null
        }
        Update: {
          business_id?: number | null
          createad_at?: string | null
          id?: number
          module_id?: string | null
          score?: number | null
          subject?: string
          type?: string
          user_id?: number
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "diagnostic_module_responses_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "diagnostic_module_responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      form_diagnostic_module_responses: {
        Row: {
          createad_at: string | null
          diagnostic_module_response_id: number
          extra_value: Json | null
          extra_value_type: string | null
          id: number
          label: string
          module_id: string
          question_id: string
          value: Json | null
          value_type: string | null
        }
        Insert: {
          createad_at?: string | null
          diagnostic_module_response_id: number
          extra_value?: Json | null
          extra_value_type?: string | null
          id?: number
          label: string
          module_id: string
          question_id: string
          value?: Json | null
          value_type?: string | null
        }
        Update: {
          createad_at?: string | null
          diagnostic_module_response_id?: number
          extra_value?: Json | null
          extra_value_type?: string | null
          id?: number
          label?: string
          module_id?: string
          question_id?: string
          value?: Json | null
          value_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "form_diagnostic_module_respon_diagnostic_module_response_i_fkey"
            columns: ["diagnostic_module_response_id"]
            isOneToOne: false
            referencedRelation: "diagnostic_module_responses"
            referencedColumns: ["id"]
          },
        ]
      }
      mentors: {
        Row: {
          booking_url: string
          created_at: string
          description: string
          experience: Json
          formation: Json | null
          full_name: string
          id: number
          linkedin_url: string | null
          photo_url: string
          preferred_project_country: string[] | null
          preferred_project_industries: string[] | null
          preferred_project_stages: string[] | null
          skills: string[]
        }
        Insert: {
          booking_url: string
          created_at?: string
          description: string
          experience: Json
          formation?: Json | null
          full_name: string
          id?: number
          linkedin_url?: string | null
          photo_url: string
          preferred_project_country?: string[] | null
          preferred_project_industries?: string[] | null
          preferred_project_stages?: string[] | null
          skills: string[]
        }
        Update: {
          booking_url?: string
          created_at?: string
          description?: string
          experience?: Json
          formation?: Json | null
          full_name?: string
          id?: number
          linkedin_url?: string | null
          photo_url?: string
          preferred_project_country?: string[] | null
          preferred_project_industries?: string[] | null
          preferred_project_stages?: string[] | null
          skills?: string[]
        }
        Relationships: []
      }
      tags: {
        Row: {
          author_name: string
          author_role: Database["public"]["Enums"]["author_role_enum"]
          color: string
          created_at: string
          id: number
          label: string
          tenant_id: string
        }
        Insert: {
          author_name?: string
          author_role: Database["public"]["Enums"]["author_role_enum"]
          color: string
          created_at?: string
          id?: number
          label: string
          tenant_id: string
        }
        Update: {
          author_name?: string
          author_role?: Database["public"]["Enums"]["author_role_enum"]
          color?: string
          created_at?: string
          id?: number
          label?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tags_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tags_tenant_permissions: {
        Row: {
          created_at: string
          id: number
          tag_id: number
          tenant: string
          tenant_permission_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          tag_id: number
          tenant: string
          tenant_permission_id: number
        }
        Update: {
          created_at?: string
          id?: number
          tag_id?: number
          tenant?: string
          tenant_permission_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "tags_tenant_permissions_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tags_tenant_permissions_tenant_fkey"
            columns: ["tenant"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tags_tenant_permissions_tenant_permission_id_fkey"
            columns: ["tenant_permission_id"]
            isOneToOne: false
            referencedRelation: "tenant_permissions"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_permissions: {
        Row: {
          created_at: string
          id: number
          role: Database["public"]["Enums"]["user_type"]
          tenant: string
          user: number
        }
        Insert: {
          created_at?: string
          id?: number
          role?: Database["public"]["Enums"]["user_type"]
          tenant: string
          user: number
        }
        Update: {
          created_at?: string
          id?: number
          role?: Database["public"]["Enums"]["user_type"]
          tenant?: string
          user?: number
        }
        Relationships: [
          {
            foreignKeyName: "tenant_permissions_tenant_fkey"
            columns: ["tenant"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenant_permissions_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          button_text_color: string | null
          community_link: string | null
          created_at: string
          favicon: string | null
          id: string
          logo: string | null
          name: string
          primary_color: string | null
          secondary_color: string | null
        }
        Insert: {
          button_text_color?: string | null
          community_link?: string | null
          created_at?: string
          favicon?: string | null
          id: string
          logo?: string | null
          name: string
          primary_color?: string | null
          secondary_color?: string | null
        }
        Update: {
          button_text_color?: string | null
          community_link?: string | null
          created_at?: string
          favicon?: string | null
          id?: string
          logo?: string | null
          name?: string
          primary_color?: string | null
          secondary_color?: string | null
        }
        Relationships: []
      }
      user_tags: {
        Row: {
          created_at: string
          id: number
          tag_id: number
          tenant: string
          tenant_permission_id: number | null
          users_businesses_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          tag_id: number
          tenant: string
          tenant_permission_id?: number | null
          users_businesses_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          tag_id?: number
          tenant?: string
          tenant_permission_id?: number | null
          users_businesses_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_tags_tenant_permission_id_fkey"
            columns: ["tenant_permission_id"]
            isOneToOne: false
            referencedRelation: "tenant_permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_tags_users_businesses_id_fkey"
            columns: ["users_businesses_id"]
            isOneToOne: false
            referencedRelation: "users_businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          areas_needs_help: string[] | null
          birth_date: string | null
          created_at: string
          email: string
          ent_city: string | null
          ent_country: string | null
          ent_first_name: string | null
          ent_last_name: string | null
          ent_phone_number: string | null
          ent_phone_prefix: string | null
          ent_state: string | null
          finished_onboarding: boolean
          full_name: string
          gender: string | null
          id: number
          personal_goal_one_three_years: string | null
          personal_goal_one_year: string | null
          profile_icon: string | null
          supabase_user: string
        }
        Insert: {
          areas_needs_help?: string[] | null
          birth_date?: string | null
          created_at?: string
          email: string
          ent_city?: string | null
          ent_country?: string | null
          ent_first_name?: string | null
          ent_last_name?: string | null
          ent_phone_number?: string | null
          ent_phone_prefix?: string | null
          ent_state?: string | null
          finished_onboarding?: boolean
          full_name: string
          gender?: string | null
          id?: number
          personal_goal_one_three_years?: string | null
          personal_goal_one_year?: string | null
          profile_icon?: string | null
          supabase_user: string
        }
        Update: {
          areas_needs_help?: string[] | null
          birth_date?: string | null
          created_at?: string
          email?: string
          ent_city?: string | null
          ent_country?: string | null
          ent_first_name?: string | null
          ent_last_name?: string | null
          ent_phone_number?: string | null
          ent_phone_prefix?: string | null
          ent_state?: string | null
          finished_onboarding?: boolean
          full_name?: string
          gender?: string | null
          id?: number
          personal_goal_one_three_years?: string | null
          personal_goal_one_year?: string | null
          profile_icon?: string | null
          supabase_user?: string
        }
        Relationships: []
      }
      users_businesses: {
        Row: {
          business_id: number
          created_at: string
          id: number
          is_active: boolean | null
          role: string | null
          tenant: string
          user_id: number
        }
        Insert: {
          business_id: number
          created_at?: string
          id?: number
          is_active?: boolean | null
          role?: string | null
          tenant: string
          user_id: number
        }
        Update: {
          business_id?: number
          created_at?: string
          id?: number
          is_active?: boolean | null
          role?: string | null
          tenant?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "users_businesses_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_businesses_tenant_fkey"
            columns: ["tenant"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_businesses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users_mentors: {
        Row: {
          created_at: string
          id: number
          mentor: number
          tenant: string
          user: number
        }
        Insert: {
          created_at?: string
          id?: number
          mentor: number
          tenant: string
          user: number
        }
        Update: {
          created_at?: string
          id?: number
          mentor?: number
          tenant?: string
          user?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_mentors_mentor_fkey"
            columns: ["mentor"]
            isOneToOne: false
            referencedRelation: "mentors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_mentors_tenant_fkey"
            columns: ["tenant"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_mentors_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_businesses_per_tenants: {
        Args: {
          p_itemsperpage: number
          p_order: string
          p_page: number
          p_search: string
          p_stage: string
          p_tenant: string
          p_type: string
        }
        Returns: Json
      }
      get_entrepreneurs_per_tenants: {
        Args: {
          p_itemsperpage: number
          p_order: string
          p_page: number
          p_search: string
          p_tenant: string
        }
        Returns: Json
      }
      get_entrepreneurs_per_tenants_v2: {
        Args: {
          p_itemsperpage: number
          p_order: string
          p_page: number
          p_search: string
          p_tenant: string
        }
        Returns: Json
      }
      get_entrepreneurs_per_tenants_v3: {
        Args: {
          p_itemsperpage: number
          p_order: string
          p_page: number
          p_search: string
          p_tag: number
          p_tenant: string
        }
        Returns: Json
      }
    }
    Enums: {
      author_role_enum: "mentor" | "organization"
      export_status: "pending" | "processing" | "done"
      export_type: "emprendedores" | "emprendimientos"
      question_type: "boolean" | "open" | "numeric"
      subject_role_enum: "entrepreneur" | "business"
      user_type: "organization" | "entrepreneur" | "mentor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      author_role_enum: ["mentor", "organization"],
      export_status: ["pending", "processing", "done"],
      export_type: ["emprendedores", "emprendimientos"],
      question_type: ["boolean", "open", "numeric"],
      subject_role_enum: ["entrepreneur", "business"],
      user_type: ["organization", "entrepreneur", "mentor"],
    },
  },
} as const
