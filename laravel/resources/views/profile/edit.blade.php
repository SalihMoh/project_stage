<x-app-layout>
    <x-slot name="header">
        <h2 class="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
            {{ __('Mon Profil') }}
        </h2>
    </x-slot>

    <div class="py-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            {{-- Update Profile Info --}}
            <section class="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 border-b pb-2">
                    🧑 Informations personnelles
                </h3>
                <div class="max-w-2xl">
                    @include('profile.partials.update-profile-information-form')
                </div>
            </section>

            {{-- Update Password --}}
            <section class="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 border-b pb-2">
                    🔒 Modifier le mot de passe
                </h3>
                <div class="max-w-2xl">
                    @include('profile.partials.update-password-form')
                </div>
            </section>

            {{-- Delete Account --}}
            <section class="bg-red-50 dark:bg-red-900 shadow-md rounded-2xl p-6 border border-red-200 dark:border-red-600">
                <h3 class="text-lg font-semibold text-red-800 dark:text-red-300 mb-4 border-b border-red-300 dark:border-red-500 pb-2">
                    ⚠️ Supprimer le compte
                </h3>
                <div class="max-w-2xl">
                    @include('profile.partials.delete-user-form')
                </div>
            </section>

        </div>
    </div>
</x-app-layout>
