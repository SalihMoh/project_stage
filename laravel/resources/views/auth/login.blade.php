<x-guest-layout style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); min-height: 100vh; display: flex; justify-content: center; align-items: center; padding: 20px;">
    <div style="background: white; border-radius: 16px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); padding: 2.5rem; width: 100%; max-width: 420px; position: relative;">
        <!-- Purple top accent bar -->
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 6px; background: linear-gradient(90deg, #667eea 0%, #71dd42 100%);"></div>

        <!-- Header -->
        <div style="text-align: center; margin-bottom: 2rem;">
            <h1 style="font-size: 1.75rem; font-weight: 700; color: #2d3748; margin-bottom: 0.5rem;">Welcome Back</h1>
            <p style="color: #718096; font-size: 0.9rem;">Sign in to your account</p>
        </div>

        <!-- Session Status -->
        <x-auth-session-status style="margin-bottom: 1rem;" :status="session('status')" />

        <form method="POST" action="{{ route('login') }}">
            @csrf

            <!-- Email Address -->
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #4a5568;" for="email">{{ __('Email') }}</label>
                <input id="email" style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.75rem 1rem; width: 100%; transition: all 0.3s ease; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);" type="email" name="email" :value="old('email')" required autofocus autocomplete="username" />
                @error('email')
                    <p style="color: #e53e3e; font-size: 0.875rem; margin-top: 0.25rem;">{{ $message }}</p>
                @enderror
            </div>

            <!-- Password -->
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #4a5568;" for="password">{{ __('Password') }}</label>
                <input id="password" style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.75rem 1rem; width: 100%; transition: all 0.3s ease; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);" type="password" name="password" required autocomplete="current-password" />
                @error('password')
                    <p style="color: #e53e3e; font-size: 0.875rem; margin-top: 0.25rem;">{{ $message }}</p>
                @enderror
            </div>

            <!-- Remember Me -->
            <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                <input id="remember_me" type="checkbox" style="margin-right: 0.5rem; accent-color: #667eea;" name="remember">
                <label for="remember_me" style="color: #4a5568;">{{ __('Remember me') }}</label>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between;">
                @if (Route::has('password.request'))
                    <a style="color: #667eea; font-size: 0.875rem; transition: color 0.2s ease;" href="{{ route('password.request') }}">
                        {{ __('Forgot your password?') }}
                    </a>
                @endif

                <button type="submit" style="background: linear-gradient(90deg, #118104 0%, #44cf5d 100%); color: white; border: none; border-radius: 8px; padding: 0.75rem 1.5rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    {{ __('Log in') }}
                </button>
            </div>
        </form>
    </div>
</x-guest-layout>