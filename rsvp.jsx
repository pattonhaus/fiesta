// California Fiesta — RSVP form

const { useState: useStateRSVP, useRef: useRefRSVP } = React;

function RSVPForm({ onSubmit, formRef }) {
  const [form, setForm] = useStateRSVP({
    name: "",
    phone: "",
    additional: 0,
    arrival: "",
    departure: "",
    dietary: "",
    questions: ""
  });
  const [errors, setErrors] = useStateRSVP({});
  const [submitting, setSubmitting] = useStateRSVP(false);
  const [submitted, setSubmitted] = useStateRSVP(false);

  const update = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: null }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = "We'd love to know your name.";
    if (!form.phone.trim()) errs.phone = "A number to text — for day-of updates.";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(form);
      setSubmitted(true);
    } catch (err) {
      window.toast?.("Something went sideways. Try again?");
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rsvp-success">
        <div className="script">Thank you</div>
        <h2>We can't wait to see you, {form.name.split(/[\s,]+/)[0]}</h2>
        <p>
          Your RSVP is in. Laura and Jeff have been notified, and you'll get
          a text from us with any last-minute details.
        </p>
        <button className="btn ghost mt-3" onClick={() => { setSubmitted(false); setSubmitting(false); }}>
          ← Edit my response
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit} ref={formRef} noValidate>
      <div className="field" data-invalid={!!errors.name}>
        <label htmlFor="rsvp-name">Your name <span className="req">*</span></label>
        <input
          id="rsvp-name"
          className="input"
          value={form.name}
          onChange={e => update("name", e.target.value)}
          placeholder="First & last"
          autoComplete="name"
        />
        {errors.name && <div className="err">{errors.name}</div>}
      </div>

      <div className="field" data-invalid={!!errors.phone}>
        <label htmlFor="rsvp-phone">Phone number for texts <span className="req">*</span></label>
        <input
          id="rsvp-phone"
          className="input"
          type="tel"
          value={form.phone}
          onChange={e => update("phone", e.target.value)}
          placeholder="(555) 123-4567"
          autoComplete="tel"
        />
        {errors.phone && <div className="err">{errors.phone}</div>}
      </div>

      <div className="field">
        <label>Additional people in your group</label>
        <div className="counter">
          <button
            type="button"
            className="pm"
            onClick={() => update("additional", Math.max(0, form.additional - 1))}
            disabled={form.additional === 0}
            aria-label="Decrease"
          >−</button>
          <div className="val">{form.additional}</div>
          <button
            type="button"
            className="pm"
            onClick={() => update("additional", Math.min(10, form.additional + 1))}
            aria-label="Increase"
          >+</button>
          <div className="hint" style={{ marginTop: 0, marginLeft: 4 }}>
            Not counting you. Children welcome.
          </div>
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="rsvp-arrival">Coming from afar? Tell us your plans! Arriving</label>
          <input
            id="rsvp-arrival"
            className="input"
            type="datetime-local"
            value={form.arrival}
            onChange={e => update("arrival", e.target.value)}
          />
          <div className="hint">Approximate is fine.</div>
        </div>
        <div className="field">
          <label htmlFor="rsvp-departure">Departing</label>
          <input
            id="rsvp-departure"
            className="input"
            type="datetime-local"
            value={form.departure}
            onChange={e => update("departure", e.target.value)}
          />
          <div className="hint">Helps us plan the weekend.</div>
        </div>
      </div>

      <div className="field">
        <label htmlFor="rsvp-diet">Any dietary restrictions?</label>
        <input
          id="rsvp-diet"
          className="input"
          value={form.dietary}
          onChange={e => update("dietary", e.target.value)}
          placeholder="Vegetarian, gluten-free, allergies — anything we should know"
        />
      </div>

      <div className="field">
        <label htmlFor="rsvp-q">Questions for the hosts</label>
        <textarea
          id="rsvp-q"
          className="textarea"
          value={form.questions}
          onChange={e => update("questions", e.target.value)}
          placeholder="Anything you're wondering about — parking, kids, what to bring, anything."
        />
      </div>

      <button type="submit" className="btn big mt-3" disabled={submitting}>
        {submitting ? "Sending…" : "Send my RSVP"}
      </button>
      <div className="hint text-center mt-2">
        Your response goes straight to Laura &amp; Jeff at pattonhaus@gmail.com.
      </div>
    </form>
  );
}

window.RSVPForm = RSVPForm;
