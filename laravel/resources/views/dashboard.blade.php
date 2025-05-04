<x-app-layout style="min-height: 100vh; background-color: #f3f4f6;">
    <!-- Header -->
    <x-slot name="header">
        <div style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); padding: 1.5rem 2rem; border-bottom: 4px solid #4f46e5;">
            <h2 style="margin: 0; font-size: 1.5rem; font-weight: 600; color: white;">
                {{ __('Tableau de Bord') }}
            </h2>
        </div>
    </x-slot>

    <!-- Main Content -->
    <div style="padding: 2rem 0;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
            
            <!-- Dashboard Card -->
            <div style="background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); overflow: hidden; border-left: 5px solid #667eea;">
                <div style="padding: 2rem;">
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div style="background: #e0e7ff; width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <svg style="width: 24px; height: 24px; color: #4f46e5;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            
                        </div>
                        <div>
                           
                            <h3 style="margin: 0; font-size: 1.25rem; font-weight: 600; color: #111827;">
                                {{ __("Vous êtes connecté!") }}
                            </h3>
                            <p style="margin: 0.25rem 0 0; color: #6b7280;">
                                {{ __("You're logged in!") }}
                            </p> 
                            <a style="color: green" href="/AdmDML">Liste des demandes</a> <br>
                            <a style="color: green" href="/AdmCL">Liste Citoyens</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>