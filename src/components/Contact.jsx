import React, { useState } from 'react'
import ContactExperience from './ContactExperience'

function Contact() {
    const [planeFlying, setPlaneFlying] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitState, setSubmitState] = useState('idle') // idle | success | error
    const [statusVisible, setStatusVisible] = useState(false)

    const dismissStatus = () => {
        setStatusVisible(false)
        window.setTimeout(() => setSubmitState('idle'), 350)
    }

    const encodeForm = (data) => {
        return Object.keys(data)
            .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key] ?? '')}`)
            .join('&')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (isSubmitting) return

        setPlaneFlying(true)
        window.setTimeout(() => setPlaneFlying(false), 600)

        setIsSubmitting(true)
    setSubmitState('idle')
    setStatusVisible(false)

        try {
            const form = e.currentTarget
            const formData = new FormData(form)

            // Netlify expects urlencoded body
            const payload = encodeForm(Object.fromEntries(formData.entries()))

            const res = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: payload
            })

            if (!res.ok) throw new Error(`Submit failed: ${res.status}`)

            setSubmitState('success')
            setStatusVisible(true)
            form.reset()

            // Auto-hide after a moment
            window.setTimeout(() => {
                dismissStatus()
            }, 4500)
        } catch {
            setSubmitState('error')
            setStatusVisible(true)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id='contact' className='py-16 px-4 md:px-8 lg:px-16'>
            <div className='max-w-7xl mx-auto relative'>
                <h2 className='text-center text-3xl sm:text-[40px] bg-[#111] font-bold bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent'>
                    Let's Connect
                </h2>

                {/* < sm: avatar behind form (absolute). >= sm: row layout */}
                <div className='relative sm:mt-8 flex min-h-[70vh] flex-col items-center justify-center gap-8 sm:flex-row'>
                    {/* Avatar / Experience */}
                    <div
                        className={[
                            // < sm: behind form, but still inside the section stacking context (NOT negative z-index)
                            'pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-30',
                            // >= sm: normal layout
                            'sm:pointer-events-auto sm:static sm:opacity-100',
                            'w-full sm:w-1/2'
                        ].join(' ')}
                    >
                        <div className='w-full max-w-md h-[320px] sm:h-[420px] md:h-[500px] flex items-center justify-center'>
                            <ContactExperience />
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className='w-full sm:w-1/2 flex items-center justify-center relative z-10'>
                        <form
                            className='w-full max-w-sm bg-transparent'
                            onSubmit={handleSubmit}
                            name="contact"
                            method="POST"
                            data-netlify="true"
                            data-netlify-honeypot="bot-field"
                        >
                            {/* Netlify required hidden fields */}
                            <input type="hidden" name="form-name" value="contact" />
                            <input type="hidden" name="subject" value="New portfolio contact" />

                            {/* Honeypot field for spam bots (should stay hidden) */}
                            <p className="hidden">
                                <label>
                                    Don’t fill this out if you’re human: <input name="bot-field" />
                                </label>
                            </p>

                            <label htmlFor="name-input" className="block mb-1 text-sm font-medium text-heading text-gray-300">
                                Full Name
                            </label>

                            <div className="relative">
                                {/* blurred bg layer (does NOT affect icon/text) */}
                                <span className="pointer-events-none absolute inset-0 rounded-base bg-neutral-secondary-medium/40 sm:bg-neutral-secondary-medium backdrop-blur-[2px]" />

                                {/* icon */}
                                <div className="absolute inset-y-0 start-0 z-10 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="#d1d5dc" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                </div>

                                {/* input (no backdrop blur here) */}
                                <input
                                    type="text"
                                    id="name-input"
                                    name='name'
                                    required
                                    className="relative z-10 block w-full ps-9 pe-3 py-2.5 bg-transparent border-2 border-gray-300 focus:border-transparent focus:outline-2 focus:outline-yellow-500/90 rounded border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                                    placeholder="please enter your name"
                                />
                            </div>

                            <label htmlFor="input-group-1" className="block mt-3 mb-1 text-sm font-medium text-heading text-gray-300">
                                Your Email
                            </label>

                            <div className="relative">
                                <span className="pointer-events-none absolute inset-0 rounded-base bg-neutral-secondary-medium/40 sm:bg-neutral-secondary-medium backdrop-blur-[2px]" />
                                <div className="absolute inset-y-0 start-0 z-10 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="#d1d5dc" strokeLinecap="round" strokeWidth="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" /></svg>
                                </div>
                                <input
                                    type="email"
                                    id="input-group-1"
                                    name='email'
                                    required
                                    className="relative z-10 block w-full ps-9 pe-3 py-2.5 bg-transparent border-2 border-gray-300 focus:border-transparent focus:outline-2 focus:outline-yellow-500/90 rounded border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                                    placeholder="please enter your email"
                                />
                            </div>

                            <label htmlFor="phone-input" className="block mt-3 mb-1 text-sm font-medium text-heading text-gray-300">
                                Phone Number
                            </label>

                            <div className="relative">
                                <span className="pointer-events-none absolute inset-0 rounded-base bg-neutral-secondary-medium/40 sm:bg-neutral-secondary-medium backdrop-blur-[2px]" />
                                <div className="absolute inset-y-0 start-0 z-10 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="#d1d5dc" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <input
                                    type="tel"
                                    id="phone-input"
                                    name='phone'
                                    className="relative z-10 block w-full ps-9 pe-3 py-2.5 bg-transparent border-2 border-gray-300 focus:border-transparent focus:outline-2 focus:outline-yellow-500/90 rounded border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                                    placeholder="please enter your number"
                                />
                            </div>

                            <label htmlFor="message-input" className="block mt-3 mb-1 text-sm font-medium text-heading text-gray-300">
                                Your Message
                            </label>

                            <div className="relative">
                                <span className="pointer-events-none absolute inset-0 rounded-base bg-neutral-secondary-medium/40 sm:bg-neutral-secondary-medium backdrop-blur-[2px]" />
                                <textarea
                                    id="message-input"
                                    name='message'
                                    rows="4"
                                    required
                                    className="relative z-10 block w-full p-2.5 bg-transparent border-2 border-gray-300 focus:border-transparent focus:outline-2 focus:outline-yellow-500/90 rounded border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                                    placeholder="Write your message here..."
                                />
                            </div>

                            {/* Inline status (keeps your portfolio theme) */}
                            {submitState === 'success' && (
                                <div
                                    className={[
                                        'relative mt-4 rounded-lg border border-gray-500/40 bg-[#111]/50 px-4 py-3 backdrop-blur-sm',
                                        'transition-all duration-300 ease-out',
                                        statusVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'
                                    ].join(' ')}
                                >
                                    <button
                                        type='button'
                                        onClick={dismissStatus}
                                        className='group absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full border border-gray-500/40 bg-transparent text-gray-300 transition-colors hover:border-yellow-400/60 hover:text-yellow-300'
                                        aria-label='Dismiss message'
                                        title='Dismiss'
                                    >
                                        <span className='relative -top-[1px] text-base leading-none'>×</span>
                                    </button>
                                    <p className='text-sm font-semibold bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent'>
                                        Message sent successfully.
                                    </p>
                                    <p className='mt-1 text-xs text-gray-300'>
                                        I’ll get back to you soon.
                                    </p>
                                </div>
                            )}

                            {submitState === 'error' && (
                                <div
                                    className={[
                                        'relative mt-4 rounded-lg border border-red-500/40 bg-[#111]/50 px-4 py-3 backdrop-blur-sm',
                                        'transition-all duration-300 ease-out',
                                        statusVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'
                                    ].join(' ')}
                                >
                                    <button
                                        type='button'
                                        onClick={dismissStatus}
                                        className='group absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full border border-red-500/40 bg-transparent text-red-200 transition-colors hover:border-red-400 hover:text-red-100'
                                        aria-label='Dismiss message'
                                        title='Dismiss'
                                    >
                                        <span className='relative -top-[1px] text-base leading-none'>×</span>
                                    </button>
                                    <p className='text-sm font-semibold text-red-300'>
                                        Something went wrong.
                                    </p>
                                    <p className='mt-1 text-xs text-gray-300'>
                                        Please try again in a moment.
                                    </p>
                                </div>
                            )}

                            <button
                                type='submit'
                disabled={isSubmitting}
                                className='group mt-7 mx-auto block bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 px-8 py-2 cursor-pointer rounded-full hover:from-yellow-400 hover:via-yellow-500 hover:to-amber-500 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-110 active:scale-95 active:translate-y-0 active:duration-75'
                            >
                                <span className='flex gap-2'>
                                    {/* Send text: black by default, gray-400 on button hover */}
                                    <span className='font-bold text-[#111] group-hover:text-gray-500'>
                    {isSubmitting ? 'Sending...' : 'Send'}
                                    </span>

                                    {/* Plane: black by default, gradient text on button hover */}
                                    <i
                                        className={[
                                            "fa-solid fa-paper-plane relative top-1.5 text-sm",
                                            "text-[#111]",

                                            // enable gradient-text only on hover
                                            "group-hover:bg-gradient-to-r group-hover:from-gray-300 group-hover:via-gray-400 group-hover:to-gray-500",
                                            "group-hover:bg-clip-text group-hover:text-transparent",

                                            "transition-transform duration-500 ease-out",
                                            planeFlying
                                                ? "translate-x-10 -translate-y-2 rotate-12 opacity-90"
                                                : "translate-x-0 translate-y-0 rotate-0 opacity-100"
                                        ].join(" ")}
                                    />
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact